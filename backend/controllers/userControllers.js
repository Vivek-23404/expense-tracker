import userModel from "../models/userModels.js"
import { errorHandler } from "../utils/error.js"

export const updateUser = async (req,res,next) =>{

  console.log("update user controller", req.user.id);
  console.log("update user controller", req.params.id);
  if(req.user.id !== req.params.id){

    // return res.status(401).json({message : "You can Update only your account"})
    return next(errorHandler(401,"You can Update only your account"))
  }

  try {
    
    if(req.body.password){
      req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set : {
          name : req.body.name,
          email : req.body.email,
          password : req.body.password,
          profilePicture : req.body.profilePicture
        }
      },
      {new : true}
    )

    const {password, ...rest} = updatedUser._doc
    res
      .status(200)
      .json({
        rest,
        success : true,
        message : "User Updated Successfully"
      })
  } catch (error) {
    next(error)
    res.json({
      error
    })

  } 
}


export const deleteUser = async (req,res,next) =>{

  if(req.user.id !== req.params.id){
    return next(errorHandler(401, "You can only delete you Account"))
  }

  try {
    
    await userModel.findByIdAndDelete(req.params.id)

    res.status(200).json({
      message : "User Deleted Successfully",
      success : true
    })
  } catch (error) {
    next(error)
  }
}