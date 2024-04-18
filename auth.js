import { expressjwt } from "express-jwt";
import jwt from 'jsonwebtoken';

const secret=Buffer.from('asdsssaqwqerrxss','base64');
export const authMiddleware=expressjwt({
    algorithms:['HS256'],
    credentialsRequired:false,
    secret,
});
export async function login(req,res){
    const {email,password}=req.body;
    if(email==="eddier@una.cr"&&password==="1234"){
        const claims={sub:1,email:"eddier@una.cr"};
        const token=jwt.sign(claims,secret);
    }else{
        res.sendStatus(404);
    }   
}