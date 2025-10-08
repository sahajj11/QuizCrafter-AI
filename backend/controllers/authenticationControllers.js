import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET || "your_jwt_secret"

export const registerUser=async(req,res)=>{
    try{
        const {username,email,password}=req.body

        const existingUser=await User.findOne({username})
        if(existingUser)return res.status(400).json({ message: "User already exists" })

        const hashedPassword=await bcrypt.hash(password, 10)

        const newUser=new User({ username, email, password: hashedPassword })
        await newUser.save()

        res.status(201).json({ message: "User registered successfully" })


    }catch(err){
        res.status(500).json({ message: "Server error", error: err.message })
    }
}

export const loginUser=async(req,res)=>{
    try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });

    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}