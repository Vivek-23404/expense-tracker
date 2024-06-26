import express from "express"
import { connectDB } from "./db/connect.js"
import router from "./routes/userRoute.js"
import cors from "cors"
import transactionRouter from "./routes/transactionRoutes.js"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"

const port = 3000

const app = express()

// DB connection
connectDB()

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())



const corsOptions = {
  // origin : "http://localhost:5173",
  origin : "https://expense-tracker-taupe-nine.vercel.app/",
  methods: "GET,POST,PUT,DELETE,PATCH",
  credentials : true,
  headers: {
    'Content-Type': 'application/json'
  },
}
app.use(cors(corsOptions))


app.use("/files", express.static("./public/files"))


// user routes
app.use("/api/user", router)



// transaction routes
app.use("/api/transactions",transactionRouter)


app.get("/",(req,res)=>{
  res.send("Hello World ok brother")
})





app.use((err,req,res,next)=>{

  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"

  return res
      .status(statusCode)
      .json({
        success : false,
        message,
        statusCode
      })
})







app.listen(port,(req,res)=>{ console.log(`Server is running on PORT : ${port}`); })
