import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

export const PrivateRoutes = () => {
  const {currentUser} = useSelector((state)=>state.auth)
  return currentUser ? <Outlet/> : <Navigate to="/login"/>
}