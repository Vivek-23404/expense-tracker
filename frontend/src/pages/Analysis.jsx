import { Select } from 'antd';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const Analysis = () => {


  const [frequency , setFrequency] = useState("7")

  const navigate = useNavigate()


  const addTransaction = () =>{
    navigate("/transactions/addtransaction")
  }
  return (
    <div className='flex w-full -z-50 p-5'>
     <div>
      <h3>Select Date</h3>
      <Select value={frequency} onChange={(values)=> setFrequency(values) }>
        <Select.Option value="7">Last 7 Days</Select.Option>
        <Select.Option value="30">Last 30 Days</Select.Option>
        <Select.Option value="365">Last 365 Days</Select.Option>
        <Select.Option value="custom">Custom</Select.Option>
      </Select>
     </div>
     <Outlet/>
    </div>
  )
}

