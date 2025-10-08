import express, { Router } from "express"
import { loginUser, registerUser } from "../controllers/authenticationControllers.js"

const authRouter=express.Router()

authRouter.post("/register",registerUser)
authRouter.post("/login",loginUser)

export default authRouter
