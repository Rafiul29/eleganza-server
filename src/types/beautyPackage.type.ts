import { Document } from "mongoose";
import { speciaistType } from "./speciaList.type";
import { bookingType } from "./booking.type";

export type beautyPackageType={
  title:string;
  description:string;
  category:string;
  images:string[];
  price:number;
  specialist:speciaistType[];
  bookings:bookingType[];
} & Document

