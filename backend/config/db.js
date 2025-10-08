import mongoose from "mongoose"

const connectDb=async()=>{
    try{
        await mongoose.connect("mongodb+srv://sahajrajput1112_db_user:yAcvC2uVsL988dlG@cluster0.rykoj1e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("db connected")
    }catch(err){
        console.log(err)
    }
}

export default connectDb