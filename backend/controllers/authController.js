import userModel from "../models/userModels.js";
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"


export const loginController = async (req, res,next) =>{


  try {
    const {email,password} = req.body;

    // console.log(email,password);

    const validUser = await userModel.findOne({email : email});

    // console.log(validUser);

    if(!validUser){
      // return res.status(404).send("User Not Found")
      return next(errorHandler(404, "User Not Found"))
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password)

    if(!validPassword){
      return next(errorHandler(401, "Invalid Credentials"))
    }

    const token = jwt.sign({ id : validUser._id }, process.env.JWT_SECRET)

    const {password : hashedPassword, ...rest} = validUser._doc


    const expiryDate = new Date(Date.now() + 3600000) // 1HR session





    res.cookie("access_token", token , {httpOnly : true, expires : expiryDate}).status(200).json({
      success : true,
      validUser,
      rest,
      message : "Login Sucessfully"
    })

  } catch (error) {

    next(error)
    // res
    // .status(400)
    // .json({
    //   success : false,
    //   error,
    // })
  }

}



export const registerController = async (req,res, next) =>{

  try {

    const {name , email , password} = req.body
    const hashedPassword = bcryptjs.hashSync(password, 10)


    const newUser = new userModel({name, email, password : hashedPassword});

    await newUser.save()

    res
    .status(201)
    .json({
      success : true,
      newUser,
      message : "User Created Successfully"
    })

    console.log(req.body);
  } catch (error) {
    next(error)
    // res
    // .status(400)
    // .json({
    //   success : false,
    //   message : error.message
    // })

  }
}




export const googleController = async (req,res,next) =>{

  try {
    
    const user = await userModel.findOne({email : req.body.email})

    if(user){

      const token = jwt.sign({ id:user._id}, process.env.JWT_SECRET)

      const {password: hashedPassword, ...rest} = user._doc

      const expiryDate = new Date(Date.now() + 3600000) //1HR

      res
        .cookie("access_token", token, {httpOnly : true, expires : expiryDate})
        .json({
          rest,
          success : true,
          message : "Login By Google",
          // user,
        })
        .status(200)
    }

    else{
      const generatePassword = Math.random().toString(36).slice(-8)
      const hashedPassword = bcryptjs.hashSync(generatePassword,10)

      const newUser = new userModel({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword,
        profilePicture : req.body.photo
      })

      await newUser.save()

      const token = jwt.sign({id : newUser._id}, process.env.JWT_SECRET)

      const {password:hashedPassword2, ...rest} = newUser._doc

      const expiryDate = new Date(Date.now() + 3600000) 

      res
        .cookie("access_token", token, {httpOnly : true, exports:expiryDate})
        .json({
          rest,
          success : true,
          message : "User Created Successfully by Gmail",
          // newUser,
        })
        .status(201)
    }


  } catch (error) {
    next(error)
  }
}


export const logoutController = async (req,res) =>{
  res
    .clearCookie("access_token")
    .status(200)
    .json({
      message : "Logout Successfully"
    })
}




