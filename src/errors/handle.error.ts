import { Response } from "express"

export const handleError=async(error:unknown,res:Response)=>{
    try{
      await Promise.reject(error);
    }catch(err){
      if(err instanceof Error){
       return res.status(400).json({message:err.message})
      }else{
      return  res.status(400).json({message:"Something went wrong!!"})
      }
    }
}