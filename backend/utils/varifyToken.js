import jwt from "jsonwebtoken"
import { errorHandler } from "./error.js";

export const varifyToken = (req,res,next) =>{
  const token = req.cookies.access_token;
  console.log(token);

  // if(!token) return res
  //   .status(401)
  //   .json({message : "Access Denied"})

  if(!token) return next(errorHandler(401, "Access Denied"))

  if(token){
    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
      // if(err) return res.status(403).json({message : "Token is invalid"})
      if(err) return next(errorHandler(403, "Token is invalid"))

      req.user = user
      next()
    })
  }
}