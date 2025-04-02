import client from "../lib/db.js";
import z from 'zod';
import bcrypt from "bcrypt";
import generateToken from "../lib/utils.js";

export const signup=async (req,res)=>{
    const userSchema=z.object({
        username:z.string().email(),
        firstName:z.string().min(2).max(50,),
        lastName:z.string().min(2).max(50),
        password:z.string().min(8).max(25)
    })
    const {success,data,error}=userSchema.safeParse(req.body); // safeParse return {success:boolean,data:object,error:object}
    if(!success){
        //console.log(error);
        return res.status(411).json({message:"Invalid data format"});
    }
    const { username, firstName, lastName, password } = data;

    try{
        const user=await client.user.findUnique({
            where:{
                username:username
            }
        })
        if(user){
            return res.status(411).json({message:"Email already taken"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=await client.user.create({
            data:{
                username:username,
                firstName:firstName,
                lastName:lastName,
                password:hashedPassword
            }
        })
        if(newUser){
            await client.account.create({
                data:{
                    userId:newUser.id,
                    balance:1+Math.floor(Math.random()*10000)
                }
            });
            const token=generateToken(newUser.id);
            return res.status(200).json({message:"User created successfully",token:token,user:{
                id:newUser.id,
                username:newUser.username,
                firstName:newUser.firstName,
                lastName:newUser.lastName
            }});
        }
    }catch(e){
        console.log("Error in userController.signup",e.message);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const signin=async (req,res)=>{
    const userSchema=z.object({
        username:z.string().email("Invalid email format"),
        password:z.string().min(8,"password must be atleast 8 characters").max(25,"password must be atmost 25 characters")
    })
    const {success,data,error}=userSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({message:"Invalid data format"});
    }
    const {username,password}=data;
    try{
        const user=await client.user.findUnique({
            where:{
                username:username
            }
        })

        if(user){
            const passwordMatch=await bcrypt.compare(password,user.password);
            if(passwordMatch){
                const token=generateToken(user.id);
                return res.status(200).json({message:"User signed in successfully",token:token,user:{
                    id:user.id,
                    username:user.username,
                    firstName:user.firstName,
                    lastName:user.lastName
                }})
            }else{
                return res.status(411).json({message:"Incorrect password"});
            }
        }else{
            return res.status(411).json({message:"User not found"});
        }
    }catch(e){
        console.log("Error in userController.signin",e.message);
        return res.status(500).json({message:"Error while signing in"});
    }
}

export const signout=(req,res)=>{

}

export const updateUser=async(req,res)=>{
    const userSchema=z.object({
        firstName:z.string().min(2).max(50),
        lastName:z.string().min(2).max(50),
        password:z.string().min(8).max(25)
    })
    const {success,data}=userSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({message:"Invalid data format"});
    }
    const {firstName,lastName,password}=data;
    try{
        const id=req.user.id;
        const hashedPassword=await bcrypt.hash(password,10);
        const updatedUser=await client.user.update({
            where:{
                id:id
            },
            data:{
                firstName:firstName,
                lastName:lastName,
                password:hashedPassword
            }
        })
        return res.status(200).json({message:"User updated successfully"});

    }catch(e){
        console.log("Error in userController.updateUser",e.message);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const searchUser=async(req,res)=>{
    const filter=req.query.filter?.trim() || "";
    try{
        const users=await client.user.findMany({
            where:{
                OR:[
                    {
                        firstName:{
                            contains:filter,
                            mode:"insensitive"
                        }
                    },
                    {
                        lastName:{
                            contains:filter,
                            mode:"insensitive"
                        }
                    }
                ]
            }
        })

        const filteredUsers=users.filter(user=>user.id!==req.user.id);
        return res.status(200).json({
            users:filteredUsers.map(user=>({
                id:user.id,
                username:user.username,
                firstName:user.firstName,
                lastName:user.lastName
            }))
        })
    }catch(e){
        console.log("Error in userController.searchUser",e.message);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const refresh=async(req,res)=>{
    const authHeader=req.headers.authorization;
    try{
        const user=req.user;
        return res.status(200).json({user:user});
    }catch(e){
        console.log("Error in userController.refresh",e.message);
        return res.status(500).json({message:"Intrnal server error"});
    }
}