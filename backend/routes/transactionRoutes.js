import express from "express"
import { addTransaction, getDataForEditTransaction, getAllTransaction, editTransaction, deleteTransaction, exportCSV } from "../controllers/transactionConrtroller.js"

const transactionRouter = express.Router()

// add transaction || POST method

transactionRouter.post("/addtransaction",addTransaction)

// get all transaction || GET method

transactionRouter.post("/gettransaction",getAllTransaction)

transactionRouter.get("/edit-transaction/:id", getDataForEditTransaction)

transactionRouter.put("/edit-transaction-id/:id",editTransaction)

transactionRouter.delete("/delete-transaction/:id", deleteTransaction)

transactionRouter.post("/transaction-download", exportCSV)



export default transactionRouter