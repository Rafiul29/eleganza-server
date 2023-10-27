import mongoose from "mongoose";
import { bookingType } from "../types/booking.type";


const bookingSchema= new mongoose.Schema<bookingType>({
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
    },
    beautyPackage:
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"BeautyPackage",
      }
},{timestamps:true})

const BookingModel=mongoose.model<bookingType>('Booking', bookingSchema)

export default BookingModel;
