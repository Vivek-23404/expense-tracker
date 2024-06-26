import { Routes,Route } from 'react-router-dom'
import { SideLayout } from '../components/Layout/SideLayout'
import { Analysis } from './Analysis'
import { Account } from './Account/Account'
import { Transactions } from './Transactions'
import { EditTransaction } from '../components/Transactions/EditTransaction'
import { AddTransaction } from '../components/Transactions/AddTransaction'
import { Calander } from './Calander'







export const HomePage = () => {
  return (
    <div>
      <div>
        <SideLayout>

        <div>
          <Routes>
          <Route path="/analysis" element={<Analysis />} />

              <Route path="/account" element={<Account />} />
              <Route path="/transactions" element={<Transactions />}>
                {/* <Route path="addtransaction" element={<AddTransaction/>}/> */}
              </Route>
              <Route path="/transactions/:id" element={<EditTransaction />} />

              <Route path="/transactions/addtransaction" element={<AddTransaction />}/>
              <Route path="/calander" element={<Calander />} />
          </Routes>
        </div>
        </SideLayout>
      </div>

      

      
    </div>
  )
}
