import mongoose from "mongoose";
import { userType } from "../types/user.type";

const userSchema= new mongoose.Schema<userType>({
    name:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true,
      unique:true
    },
    password:{
        type:String,
        required:true
    },
    photoUrl:{
      type:String,
      required:true
    },
    address:{
      type:String,
    },
    phoneNumber:{
      type:String,
    },
    role:{
      type:String,
      enum:['user','admin'],
      default:'user',
      required:true
    },
    bookings:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking",
      }
    ]
},{timestamps:true})

const UserModel=mongoose.model<userType>('User',userSchema)

export default UserModel;
