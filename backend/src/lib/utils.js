import jwt from 'jsonwebtoken';
const JWT_SECRET=process.env.JWT_SECRET;

export default function generateToken(userId){
    const token=jwt.sign({userId},JWT_SECRET,{expiresIn:"1d"});
    return token;                  
}