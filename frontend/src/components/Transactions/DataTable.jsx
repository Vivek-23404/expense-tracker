
import { message, Select, Table, DatePicker } from "antd";
import axios from "axios";
import {  useEffect, useMemo, useState } from "react"
import moment from "moment";
// import {useReactTable, getCoreRowModel, flexRender} from "@tanstack/react-table"
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import {Link, useNavigate} from "react-router-dom"


const {RangePicker} = DatePicker
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { axiosUrl } from "../../main";







export const DataTable = () => {

  const {currentUser} = useSelector((state)=>state.auth)

  const navigate = useNavigate()



  


  const [frequency , setFrequency] = useState('7')
  const [selectedDate, setSelectedDate] = useState([])
  const [type, setType]  = useState("all")
  const [allTransaction, setAlllTransaction] = useState([])
  

  const [rowKey, setRowKey] = useState([])








  const getAllTransaction = async () =>{
    try {
      
      const user = currentUser.rest

      const response = await axiosUrl.post("/api/transactions/gettransaction",{userid: user._id,frequency,selectedDate,type})

      const val = response.data
      setAlllTransaction(val)
      // console.log(val);


      // console.log(response.data);
      // console.log(allTransaction);

      const keyArr = val.map((item)=> item.id)

      setRowKey(keyArr)

      
    } catch (error) {
      console.log(error);
      message.error("Something is Wrong")
    }
  }







  const totalTrinsaction = allTransaction.length
  const totalIncomeTrinsaction = allTransaction.filter(transaction => transaction.type === "income")
  const totalExpenseTrinsaction = allTransaction.filter(transaction => transaction.type === "expense")

  const totalIncomePersentage = (totalIncomeTrinsaction/totalTrinsaction) * 100
  const totalExpensePersentage = (totalExpenseTrinsaction/totalTrinsaction) * 100




  // turn over
  const totalTurnOver = allTransaction.reduce((acc,transaction)=> acc + transaction.amount, 0)

  // total Income

  const totalIncomeTurnover = allTransaction.filter(transaction => transaction.type === "income")
  .reduce((acc,transaction)=> acc + transaction.amount,0)

  // console.log(totalIncomeTurnover);


  // total Expense
  const totalExpenseTurnover = allTransaction.filter(transaction => transaction.type === "expense")
  .reduce((acc,transaction)=> acc + transaction.amount,0)


  const totalIncomeTurnoverPercent = (totalIncomeTurnover/totalTurnOver) * 100

  const totalExpenseTurnoverPercent = (totalExpenseTurnover/totalIncomeTurnover) * 100


  const handleEditClick = (e) =>{
    navigate(`/edit-transaction/${dataWithKey}`)
    console.log(e);
  }



  const columns = [
    {
      // key:"amount",
      title : "Amount",
      dataIndex : "amount",
    },
    {
      // key:"type",
      title : "Type",
      dataIndex : "type",
    },
    {
      // key:"category",
      title : "Category",
      dataIndex : "category",
    },
    {
      // key:"date",
      title : "Date",
      dataIndex : "date",
      render : (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      // key:"details",
      title : "Details",
      dataIndex : "details",
    },
    {
      // key:"actions",
      title : "Action",
      render : (text,record) => (
        <div className="flex gap-5">
          <Link to={`/edit-transaction-id/${record.key}`}>
            <MdModeEdit  size={20} />
            {console.log(record)}
          </Link>

          <Link to={`/delete-transaction/${record.key}`}>
            <MdDelete size={20}/>
          </Link>

        </div>
      )
    },

  ]
  // console.log(allTransaction);

  const dataWithKey = allTransaction.map(row => ({
    key : row._id,
    amount : row.amount,
    type : row.type,
    category : row.category,
    date : row.date,
    details : row.details
  }
  ))
  console.log(dataWithKey);



  const exportCSV = async () =>{
    try {
      
      const response = await axiosUrl.post("/api/transactions/transaction-download",{frequency,selectedDate,type})

      if(response.status === 200){

        window.open(response.data.downloadURL, "blank")
      }else{
        toast.error("Error")
      }

      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  }






  /**@type import("@tanstack/react-table").ColumnDef<any> */
  // const columns = [
  //   // {
  //   //   header : "ID",
  //   //   accessorKey : "_id"
  //   // },
  //   {
  //     header : "Amount",
  //     accessorKey : "amount"
  //   },
  //   {
  //     header : "Type",
  //     accessorKey : "type"
  //   },
  //   {
  //     header : "Category",
  //     accessorKey : "category"
  //   },
  //   {
  //     header : "Date",
  //     accessorKey : "date"
  //   },
  //   {
  //     header : "Details",
  //     accessorKey : "details"
  //   }, 
  //   {
  //     header : "Actions"
  //   }
  // ]

  
  

  
  
  // const data = useMemo(() => allTransaction, [])
  
  // const data = allTransaction
  // const table = useReactTable({data,columns,getCoreRowModel : getCoreRowModel()})

  useEffect(()=>{
    getAllTransaction()
  },[frequency,selectedDate,type])
  
  return (
    <div className="h-full flex flex-col gap-5">

      <div className="flex flex-col gap-2">

          <div className="flex justify-between w-full">


            <div className="flex gap-2">

            
            {/* Date Filter */}
            <div>
              <h3>Select Date</h3>
              <Select   value={frequency} onChange={(values)=> setFrequency(values) }>
                <Select.Option value="7">Last 7 Days</Select.Option>
                <Select.Option value="30">Last 30 Days</Select.Option>
                <Select.Option value="365">Last 365 Days</Select.Option>
                <Select.Option value="custom">Custom</Select.Option>
              </Select>

              {
                  frequency === "custom" && <RangePicker value={selectedDate} onChange={(values)=> setSelectedDate(values)}/>
              }
            </div>
              {/* Type Filter */}
            <div className="w-40">
              <h3>Select Type</h3>

              <Select className="w-full" value={type} onChange={(value) => setType(value)} >
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
                <Select.Option value="income">Income</Select.Option>
              </Select>
            </div>

            </div>

            


            <button onClick={exportCSV} className="w-28 h-10 bg-slate-700 text-white rounded-md ">Export</button>
          
          
          </div>


        <Table className="border z-0" columns={columns} dataSource={dataWithKey}   scroll={{y:10000}} />

        
      </div>
    </div>
  )
}





{/* <table>
          <thead>
            
          {table.getHeaderGroups().map(headerGroups => 
          (<tr key={headerGroups.id}>
            {headerGroups.headers.map(header => 
            (<th key={header.id}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>)
          )}
          </tr>)
          )} 
          </thead>

          <tbody>
            {table.getRowModel().rows.map(row => 
            (<tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>)
          )}

          </tbody>
        </table> */}