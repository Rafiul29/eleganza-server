import { Document } from "mongoose";
import { beautyPackageType } from "./beautyPackage.type";

export type speciaistType={
  name:string;
  designation:string;
  bio:string;
  photo:string;
  dateOfBirth:string;
  beautyPackages:beautyPackageType[];
} & Document

