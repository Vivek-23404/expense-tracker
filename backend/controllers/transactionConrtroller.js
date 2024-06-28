import { transactionModel } from "../models/transactionModel.js"
import moment from "moment"
import userModel from "../models/userModels.js"
import * as csv from "fast-csv"

import  fs from "fs"


export const getAllTransaction = async (req,res) =>{
  try {
    // console.log(req.body.userid);
    const {frequency,selectedDate,type,userid} = req.body
    // console.log(req.body);
    const transactions = await transactionModel.find({
      userid,
      ...(frequency !== "custom"
       ? {
          date:{
            $gt : moment().subtract(Number(frequency),'d').toDate(),
          },
        }
       : {
        date : {
          $gte : selectedDate[0],
          $lte : selectedDate[1]
        }
      }),
      ...(type !== "all" && {type})
    })
    // console.log(typeof(transactions[0].userid));
    // console.log(transactions);

    res.status(200).json(transactions)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}


export const addTransaction = async (req,res) =>{
  try {

    const data = req.body
    // console.log(req.body);
    console.log(typeof(req.body.userid));

    const currentUser = await userModel.findById({_id : req.body.userid})

    let abc; 
    if(currentUser){
      abc = await transactionModel.create(data)
    }
    else{
      throw new Error("cant create")
    }
    // console.log(abc);


    res.status(201).json({
      message : "Transaction Created",
      success : true
    })

  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

export const getDataForEditTransaction =async (req,res) =>{
  try {
    const {id} = req.params
    // console.log(id);

    const findTransactionID = await transactionModel.findById(id)

    // console.log(findTransactionID);
    res.send(findTransactionID).json(findTransactionID)
  } catch (error) {
    console.log(error);
  }
}
 

export const editTransaction = async (req,res) =>{
  try {
    // console.log(req.body);
    const {values, id} = req.body
    console.log(values);
    console.log(typeof(id));

    const findID = await transactionModel.findById(id)
    console.log(typeof(findID));
    console.log("Before update",findID);

    // const verifyTransactionID = JSON.parse(transactionID)
    // console.log(verifyTransactionID);
    const updatedData = await transactionModel.findByIdAndUpdate(id, values)
    console.log("Updated Data : ", updatedData);

    const afterUpdate = await transactionModel.findById(updatedData._id)
    console.log(afterUpdate);


    res.json({
      success : true,
      message : "Transaction edited successfullyy"
    })
  } catch (error) {
    console.log(error);
  }
}


export const deleteTransaction = async (req,res) =>{
  try {
    const {id} = req.params

    const findTransaction = await transactionModel.findById(id)
    if(!findTransaction){
      throw new Error("Transaction doesnt Exist")
    }

    console.log(findTransaction);


    const deleteResponse = await transactionModel.findByIdAndDelete(id)


    res.json(deleteResponse)
  } catch (error) {
    console.log(error);
  }
}



export const exportCSV = async (req,res) =>{
  try {
    
    const {frequency,selectedDate,type} = req.body
    const transactionData = await transactionModel.find({
      ...(frequency !== "custom"
      ? {
         date:{
           $gt : moment().subtract(Number(frequency),'d').toDate(),
         },
       }
      : {
       date : {
         $gte : selectedDate[0],
         $lte : selectedDate[1]
       }
     }),
     ...(type !== "all" && {type})
    })

    const csvStream = csv.format({headers : true})

    if(!fs.existsSync("public/files/export/")){

      if(!fs.existsSync("public/files")){
        
        fs.mkdirSync("public/files/");
        
      }
      
      if(!fs.existsSync("public/files/export")){
        fs.mkdirSync("./public/files/export/");
        return
      }
    }


    const writableStream = fs.createWriteStream(
      "public/files/export/transactions.csv"
    ); 

    csvStream.pipe(writableStream)

    writableStream.on("finish",function (){
      res.json({
        downloadURL : "http://localhost:3000/files/export/transactions.csv"
      })
    })



    let counter = 1
    if(transactionData.length > 0){
      transactionData.map((transaction)=>{
        csvStream.write({
          Sr_no : counter,
          Amount : transaction.amount,
          Type : transaction.type,
          Category : transaction.category,
          Date : transaction.date.toLocaleDateString(),
          Details : transaction.details
        })

        counter++
      })
    }


    csvStream.end()
    writableStream.end()

    res.json({
      success : true,
      message : "CSV Download success"
    })
  } catch (error) {
    res.status(401).json(error)
    console.log(error);
  }
}