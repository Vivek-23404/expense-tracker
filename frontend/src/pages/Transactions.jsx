
import { Link } from 'react-router-dom'

import { DataTable } from '../components/Transactions/DataTable'


export const Transactions = () => {
  return (
    <div className='flex flex-col gap-2 z-30 p-5'>
      <div className='flex justify-between items-center bg-gray-200 p-2 rounded-md'>
        <h1>Transactions</h1>
        <Link to="/addtransaction">
          <button className='bg-slate-700 text-white rounded-md p-1'>
            Add Transactions
          </button>
        </Link>
        <Link to="/gettransaction">
          <button className='bg-slate-700 text-white rounded-md p-1'>
            Get Transactions
            
          </button>
        </Link>
        
      </div>

      <div className='p-2 rounded-md h-full'>
        <DataTable />
      </div>
    </div>
  )
}
