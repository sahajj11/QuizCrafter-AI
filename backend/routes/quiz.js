import express, { Router } from "express"

import { generateQuiz } from "../controllers/quizControllers.js"

const quizRouter=express.Router()

quizRouter.post("/generate/quiz",generateQuiz)
export default quizRouter
