import axios from "axios"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const DeleteTransaction = () => {

  const {id} = useParams()
  const navigate = useNavigate()

  const deleteTransaction = async () =>{

    try {
      
      
      if(confirm("Are you want to delete this")=== true){

        const res = await axios.delete(`/api/transactions/delete-transaction/${id}`)
        const data = res.data
  
        console.log(data);

        navigate("/transactions")
      }else{
        navigate("/transactions")
      }
    } catch (error) {
      
      console.log(error);
    }
  }

  useEffect(()=>{ deleteTransaction()}, [])

  console.log("Id from FrontEnd : ", id);
  return (
    <div>DeleteTransaction </div>
  )
}