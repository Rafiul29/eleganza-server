import { Document } from "mongoose";

import { bookingType } from "./booking.type";
import { specialistType } from "./specialist.type";

export type beautyPackageType={
  title:string;
  description:string;
  category:string;
  images:string[];
  price:number;
  specialist:specialistType[];
  bookings:bookingType[];
} & Document

