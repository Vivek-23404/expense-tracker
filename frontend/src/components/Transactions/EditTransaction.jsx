import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"
import {Form , Input, Select, message} from "antd"
import TextArea from "antd/es/input/TextArea";
import moment from "moment";


export const EditTransaction = () => {

    const [form] = Form.useForm()
    const navigate = useNavigate()

    const [reqData, setReqData] = useState(null)


    const {id} = useParams()
    console.log(id);

    // console.log(reqData);
    
    useEffect(()=>{
      getTransactionData()
    },[])

    const getTransactionData = async () =>{
      try {
        const res = await axios.get(`/api/transactions/edit-transaction/${id}`)
        const val =  await res.data
        // console.log(res.data);

        const initialVal = {
          amount : val.amount,
          category : val.category,
          type : val.type,
          date : (moment(val.date)).format("YYYY-MM-DD"),
          details : val.details
        }
        setReqData(initialVal)
        

      } catch (error) {
        console.log(error);
      }
    }

    if(!reqData){
      return <div>Loading</div>
    }
    
    // console.log(reqData);
    


    const submitHandler = async (e) =>{
      try {
        e.preventDefault()
        const res = await axios.get(`/api/transactions/edit-transaction/${id}`)
        // console.log(res.data);
        setReqData(res.data)
      } catch (error) {
        console.log(error);
      }
    }
 
    const updateData = async (values) =>{
      try {
        const res = await axios.put(`/api/transactions/edit-transaction-id/${id}`,{id,values})
        // console.log(id);
        console.log("updated successfylly", res.data);

        navigate("/transactions")

      } catch (error) {
        console.log(error);
      }
    }
    
 
  

  return (
    <div className="p-10 w-full flex flex-col  items-center gap-10">
      <div className="w-full">Edit Your Transaction Details</div>

      {/* Transactions Input */}

      {/* <form  action="" >
        <button onClick={submitHandler} type="submit">Hello</button>
      </form> */}


      <Form layout="vertical" initialValues={reqData}  onFinish={updateData} >
          <Form.Item  label="Amount" name="amount">
            <Input />
          </Form.Item>

          <Form.Item  label="Type" name="type">
            <Select >
              <Select.Option  value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
        </Form.Item>

        <Form.Item label="Category" name="category">
          <Select >
            <Select.Option value="salary">Salary </Select.Option>
            <Select.Option value="stock">Stock</Select.Option>
            <Select.Option value="freelance">Frellance</Select.Option>
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="bills">Bills</Select.Option>
            <Select.Option value="medical">Medical</Select.Option>
            <Select.Option value="fees">Fees</Select.Option>
            <Select.Option value="tax">TAX</Select.Option>
          </Select>
        </Form.Item>


        <Form.Item label="Date" name="date">
          <Input type="date" />
        </Form.Item>

        <Form.Item label="Details"   name="details">
          <TextArea   rows={4}/>
        </Form.Item>
      <button>Save</button>
      </Form>


      <ToastContainer
      position="top-right"
      />
</div>
  )
}








































//  // Dropdown (Category) states
//  const [open, isOpen] = useState(false);
//  const [seletDropdown, setSelectDropdown] = useState(null);

//  // Forms & Data input states

//  const [formData, setFormData] = useState({
//    details: "",
//    category: "",
//    amount: "",
//    date: "",
//  });
//  const option = [
//    { label: "Vehecle", value: 1 },
//    { label: "Food", value: 2 },
//    { label: "Cloth", value: 3 },
//  ];

//  const handleChange = (e) => {
//    console.log(e.target.value);

//    setFormData(() => ({
//      ...formData,
//      [e.target.name]: e.target.value,
//    }));
//  };




//  // Form Validation and form sumbit

//  const handleFormSubmit = (e) => {
//    e.preventDefault();
//    console.log(formData);


//    // destructuring formData 

//    const {details,category,amount,date} = formData

//    if(details === ""){
//      toast.error("Details are required")
//    }
//    else if(category === ""){
//      toast.error("Category is required")
//    }
//    else if(amount === ""){
//      toast.error("Amount is reqired")
//    }
//    else if(date === ""){
//      toast.error("Data is required")
//    }
//    else{
//      toast.success("Data entered Successfully")
//    }
//  };