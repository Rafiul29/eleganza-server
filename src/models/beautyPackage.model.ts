import mongoose from "mongoose";
import { beautyPackageType} from "../types/beautyPackage.type";

const beautyPackageSchema= new mongoose.Schema<beautyPackageType>({
    title:{
      type:String,
      required:true
    },
    description:{
      type:String,
      required:true,
    },
    category:{
        type:String,
        required:true
    },
    images:[
      {
        type:String,
        required:true,
      }
    ]
    ,
    price:{
      type:Number,
      required:true,
    },
    specialist:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Specialist",
      }
    ],
    bookings:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking",
      }
    ]
},{timestamps:true})

const BeautyPackageModel=mongoose.model<beautyPackageType>('BeautyPackage',beautyPackageSchema)

export default BeautyPackageModel;
