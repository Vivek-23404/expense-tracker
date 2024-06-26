import { Routes,Route, Navigate, Outlet } from "react-router-dom"



import { Register } from "./pages/Account/Register"
import { Login } from "./pages/Account/Login"

import { Home } from "./pages/Home"
import { Dashboard } from "./pages/Dashboard"
import { Analysis } from "./pages/Analysis"
import { Account } from "./pages/Account/Account"
import { Transactions } from "./pages/Transactions"
import { AddTransaction } from "./components/Transactions/AddTransaction"
import { DataTable } from "./components/Transactions/DataTable"
import { Calander } from "./pages/Calander"
import { PrivateRoutes } from "./components/PrivateRoutes"
import { EditProfile } from "./pages/EditProfile"
import { EditTransaction } from "./components/Transactions/EditTransaction"
import { DeleteTransaction } from "./components/Transactions/DeleteTransaction"



function App() {
  return (
    <>
        <Routes>
          <Route   path="/login" element={<Login/>}/>
          <Route  path="/register" element={<Register/>}/>
          
          <Route  element={<PrivateRoutes/>}>
            <Route path="/" element={<Home/>}>
                <Route path="/" element={<Dashboard/>}/>
                <Route path='/analysis' element={<Analysis/>}/>
                <Route path='/calander' element={<Calander/>}/>
                <Route path='/account' element={<Account/>}/>
                <Route path='/transactions' element={<Transactions/>}/>
                <Route path="/addtransaction" element={<AddTransaction/>}/>
                <Route path="/gettransaction" element={<DataTable/>}/>
                <Route path="/edit-profile" element={<EditProfile/>}/>
                <Route path="/edit-transaction-id/:id" element={<EditTransaction />}/>
                <Route path="/delete-transaction/:id" element={<DeleteTransaction/>} />
            </Route>
          </Route>

        </Routes>       

    </>
  );
}



// export function ProtectedRoutes(props){

  
//     if(localStorage.getItem('user')){
//       return <Outlet/>
//     }
//     else {
//       return <Navigate to='/login'/>
//     }
 
// }
export default App


