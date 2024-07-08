import jwt from "jsonwebtoken"
import { errorHandler } from "./error.js";



export const varifyToken =  (req,res,next) =>{
  // const token = await req.cookies.access_token;
  const token =  req.cookies.access_token;
  console.log(token);

  // if(!token) return res
  //   .status(401)
  //   .json({message : "Access Denied"})

  if(!token) {

    next(errorHandler(401, "Access Denied"))
  } 

  if(token){
    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
      // if(err) return res.status(403).json({message : "Token is invalid"})
      if(err){
        return errorHandler(403, "Token Invalid")
      } 

      req.user = user
      console.log(user);
      next()
    })
  }
}