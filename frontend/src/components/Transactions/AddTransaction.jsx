import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Form, Input, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosUrl } from "../../main";

export const AddTransaction = () => {

  const navigate = useNavigate()

  const {currentUser} = useSelector((state)=>state.auth)
  // console.log(currentUser.rest._id);

  const submitHandler = async (values) =>{
    console.log(values);

    try {
      const user = currentUser.rest
      // console.log(user);

      const res = await axiosUrl.post("/api/transactions/addtransaction",{...values,userid:user._id})
      // const res = await axios.post("/api/transactions/addtransaction",{...values,userid:"adadadadadadadadadadadad"})

      console.log(res);

      navigate("/transactions")

      message.success("Transaction Added Successfully")
      
    } catch (error) {
      console.log(error);
      message.error("Failed to Add Transaction")
    }
  }

  return (
    <div className="p-10 w-full flex flex-col  items-center gap-10">
      <div className="w-full">Enter Your Transaction Details</div>

      {/* Transactions Input */}

      <div className="w-96">

      
      <Form layout="vertical" onFinish={submitHandler}>

        <Form.Item label="Amount" name="amount">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Type" name="type">
          <Select>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Category" name="category">
          <Select >
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="stock">Stock</Select.Option>
            <Select.Option value="freelance">Frellance Project</Select.Option>
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="bills">Bills</Select.Option>
            <Select.Option value="medical">Medical</Select.Option>
            <Select.Option value="fees">Fees</Select.Option>
            <Select.Option value="tax">TAX</Select.Option>
          </Select>
        </Form.Item>


        <Form.Item label="Date"  name="date">
          <Input type="date"/>
        </Form.Item>

        <Form.Item label="Details" name="details">
          <TextArea  rows={4}/>
        </Form.Item>


        <div  className="flex justify-center items-center p-3 bg-slate-700 text-white font-bold rounded-lg cursor-pointer">
          <button>Save</button>
        </div>

      </Form>
      </div>

      
      <ToastContainer position="top-right"/>
</div>
  );
};

















{
  /* <div className="relative flex flex-col">
              Type
              <button
                
                onClick={() => isOpen((prev) => !prev)}
                className="bg-blue-100 flex justify-evenly items-center px-4 py-2 rounded-md font-bold"
              >
                {seletDropdown ? seletDropdown : "Category"}
                {!open ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
              </button>
              {open && (
                <div className="bg-blue-100 absolute w-full top-16 rounded-md p-2">
                  {list.map((item, i) => (
                    <div
                      onClick={() => {
                        setSelectDropdown(item.category);
                        isOpen(false);
                      }}
                      className="flex w-full justify-between items-center hover:cursor-pointer hover:bg-blue-200"
                      key={i}
                    >
                      <h3 >{item.category}</h3>
                    </div>
                  ))}
                </div>
              )}
            </div> */
}






















// Custom Form


  // // Dropdown (Category) states
  // const [open, isOpen] = useState(false);
  // const [seletDropdown, setSelectDropdown] = useState(null);

  // // Forms & Data input states

  // const [formData, setFormData] = useState({
  //   expenseType:"",
  //   details: "",
  //   category: "",
  //   amount: "",
  //   date: "",
  // });

  // const expenseType = [
  //   {label : "Inceom" , value : 1},
  //   {label : "Expense" , value : 2}
  // ]

  // const option = [
  //   { label: "Vehecle", value: 1 },
  //   { label: "Food", value: 2 },
  //   { label: "Cloth", value: 3 },
  // ];

  // const handleChange = (e) => {
  //   console.log(e.target.value);

  //   setFormData(() => ({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData);


  //   // destructuring formData 

  //   const {details,category,amount,date} = formData

  //   if(details === ""){
  //     toast.error("Details are required")
  //   }
  //   else if(category === ""){
  //     toast.error("Category is required")
  //   }
  //   else if(amount === ""){
  //     toast.error("Amount is reqired")
  //   }
  //   else if(date === ""){
  //     toast.error("Data is required")
  //   }
  //   else{
  //     toast.success("Data entered Successfully")
  //   }


  // };














  // Part -2


  // <form action="" >
  //       <div className="shadow-2xl mt-3 p-3 flex flex-col gap-20">
  //         <div className="flex">

  //           <div className="p-5 flex flex-col justify-between items-start gap-5">


  //             {/* Income or Expense */}
  //             <div className="flex flex-col gap-2">
  //               <label htmlFor="type">Type</label>
  //               <select
  //               className="bg-blue-100 flex justify-evenly items-center px-4 py-2 rounded-md font-bold"
  //               name="type"
  //               id=""
  //               defaultValue={expenseType[1]}
  //               onChange={handleChange}
  //               value={formData.expenseType}
  //               >
  //                 <option value="Type">Type</option>
  //                 <option value="Income">Income</option>
  //                 <option value="Expense">Expense</option>
                  
  //               </select>
  //             </div>


  //             {/* First Input Field */}
  //             <div className="flex flex-col gap-2">
  //               <label htmlFor="details">Details</label>
  //               <input
  //                 className=" bg-slate-200 rounded-md p-2 outline-none"
  //                 type="text"
  //                 name="details"
  //                 value={formData.details}
  //                 onChange={handleChange}
  //               />
  //               <br />
  //             </div>


  //             {/* Second Input Field */}
  //             <div className="flex flex-col gap-2">
  //                 <label htmlFor="">Category</label>
  //                 <select
  //                   className="bg-blue-100 flex justify-evenly items-center px-4 py-2 rounded-md font-bold"
  //                   name="category"
                    
  //                   id=""
  //                   onChange={handleChange}
  //                   value={formData.category}
  //                 >
  //                   {option.map((item, i) => (
  //                     <option key={i}>{item.label}</option>
  //                   ))}
  //                 </select>
  //             </div>

  //           </div>


  //           <div className="p-5 flex flex-col justify-between items-start gap-5">


  //             {/* Third Input Field */}
              
  //             <div className="flex flex-col gap-2">
  //               <label htmlFor="Trasaction Input">Ammount :</label>
  //               <input
  //                 className=" bg-slate-200 rounded-md p-2 outline-none"
  //                 type="number"
  //                 name="amount"
  //                 placeholder=""
  //                 onChange={handleChange}
  //                 value={formData.amount}
  //               />
  //             </div>



  //             {/* Fourth Input Field */}

  //             <div className="flex flex-col gap-2">
  //               <label htmlFor="date">Date</label>
  //               <input
  //                 className=" bg-slate-200 rounded-md p-2 outline-none"
  //                 type="date"
  //                 name="date"
  //                 placeholder="date"
  //                 onChange={handleChange}
  //                 value={formData.date}
  //               />

  //             </div>
              

              
  //           </div>
  //         </div>

  //         <button onClick={handleFormSubmit} type="submit" className="bg-blue-100 p-4 mt-3">
  //           Add Transaction
  //         </button>





  //         <div>
  //           Display Here <br />
  //           {formData.details}
  //         </div>
  //       </div>
        
  //     </form>