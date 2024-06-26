import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema({
  userid : {
    type : mongoose.Schema.Types.ObjectId, ref :  "users",
    // type : String,
    required : true,
  },
  amount : {
    type : Number,
    required : [true, "Amount Is Require"],
    trim : true
  },
  type:{
    type : String,
    required : [true, "Type Is required"]
  },
  category : {
    type : String,
    required : [true, "Category is Require"],
    trim : true
  },
  details : {
    type : String,
    required : [true, "Details are required"]
  },
  date : {
    type : Date,
    required : [true, "Data is requires"]
  }
  
},{timestamps:true})

export const transactionModel = mongoose.model('transactions',transactionSchema)