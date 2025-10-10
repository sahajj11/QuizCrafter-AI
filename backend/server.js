dotenv.config()

import express from "express"
import connectDb from "./config/db.js"
import authRouter from "./routes/authUser.js"
import cors from "cors"
import quizRouter from "./routes/quiz.js"
import dotenv from "dotenv"




const app=express()
const PORT=process.env.PORT || 5000

connectDb()

app.use(cors())
app.use(express.json())

app.use("/api",authRouter)
app.use("/api",quizRouter)

app.listen(PORT,()=>{
    console.log("server started")
})

