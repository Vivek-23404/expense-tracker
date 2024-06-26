import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  name : {
    type : String,
    required : [true, 'Name is Required'],
  },
  email : {
    type : String,
    required : [true, 'Email is Required and should be unique'],
    unique : true
  },
  password:{
    type : String,
    required : true,
  },
  profilePicture:{
    type :String,
    default :"https://boostlikes-bc85.kxcdn.com/blog/wp-content/uploads/2019/08/No-Instagram-Profile-Pic.jpg"
  }
},{timestamps : true})




// Exporting User Model

const userModel = mongoose.model('users',userSchema)

export default userModel