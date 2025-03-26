import client from "../lib/db.js";

export const transferBalance=async(req,res)=>{
    try{
        const transaction=await client.$transaction(async (client)=>{// to avoid negative balance and if one failed the other will not be executed
            const {toAccountId,amount}=req.body;
            const fromAccountId=req.user.id;
            const balanceFromAccount=await client.account.findUnique({
                where:{userId:fromAccountId},
                select:{balance:true}
            })

            if(!balanceFromAccount || balanceFromAccount.balance<amount){
                return res.status(400).json({message:"Insufficient balance"});
            }

            const isToAccountExist=await client.account.findUnique({
                where:{userId:toAccountId}
            })

            if(!isToAccountExist){
                return res.status(400).json({message:"Invalid account"})
            }

            client.account.update({
                where:{
                    userId:fromAccountId
                },
                data:{
                    balance:{
                        decrement:amount
                    }
                }
            }),

            client.account.update({
                where:{
                    userId:toAccountId
                },
                data:{
                    balance:{
                        increment:amount
                    }
                }
            })
        })
        return res.status(200).json({message:"Transfer successful",transaction});

    }catch(e){
        console.log("Error in transferBalance",e.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export const getBalance=async(req,res)=>{
    try{
        const account=await client.account.findUnique({
            where:{userId:req.user.id}
        });
        return res.status(200).json({balance:account.balance});
    }catch(e){
        console.log("Error in getBalance",e.message);
        res.status(500).json({message:"Internal server error"});
    }
}

//export const transactionHistory=async(req,res)=>{}