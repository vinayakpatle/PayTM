import client from "../lib/db.js";
import jwt from "jsonwebtoken";


export default async function userMiddleware(req,res,next){
    const authHeader=req.headers.authorization;

    try{
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({message:"Unauthorized- Token not provided"});
        }
        const token=authHeader.split(" ")[1];
        const JWT_SECRET=process.env.JWT_SECRET;
        const decoded=jwt.verify(token,JWT_SECRET);
        const user=await client.user.findUnique({
            where:{
                id:decoded.userId
            },
            select:{
                id:true,
                username:true,
                firstName:true,
                lastName:true
            }
        })
        if(!user){
            return res.status(401).json({message:"Unauthorized- User not found"});
        }
        req.user=user;
        next();
    }catch(e){
        console.log("Error in userMiddleware",e.message);
        return res.status(500).json({message:"Internal server error"});
    }
}