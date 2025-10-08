import express from "express"
import connectDb from "./config/db.js"
import authRouter from "./routes/authUser.js"
import cors from "cors"

const app=express()
const PORT=process.env.PORT || 5000

connectDb()

app.use(cors())
app.use(express.json())

app.use("/api",authRouter)

app.listen(PORT,()=>{
    console.log("server started")
})