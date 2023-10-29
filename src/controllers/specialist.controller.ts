import { Response, Request } from "express";
import { handleError } from "../errors/handle.error";

import mongoose from "mongoose";
import SpecialistModel from "../models/specialist.mode";
import BeautyPackageModel from "../models/beautyPackage.model";

export default class SpecialistController {
  constructor() { }

  // get all specialist
  public async getAllSpecialist(req: Request, res: Response): Promise<void> {

    try {
      await Promise.resolve().then(async () => {
        const specialists = await SpecialistModel.find({})
        res.status(200).json(specialists);
      })

    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  // get a specialist
  public async getSpecialist(req: Request, res: Response): Promise<void> {

    try {
      const { sid } = req.params;
      if (!mongoose.Types.ObjectId.isValid(sid)) {
        res.status(404).json({ message: "specialist not found" });
        return
      }
      await Promise.resolve().then(async () => {
        const specialist = await SpecialistModel.findById(sid);

        res.status(200).json(specialist);
      })

    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  // create a specialist
  public async createSpecialist(req: Request, res: Response): Promise<void> {

    try {
  
      const { name,
        designation,
        bio,
        photoUrl,
        dateOfBirth,
      } = req.body;

      const {bid}=req.params;

      if (!mongoose.Types.ObjectId.isValid(bid)) {
        res.status(404).json({ message: "Beauty package not found" });
        return
      }

      await Promise.resolve().then(async () => {
        const specialist = await SpecialistModel.create({
          name,
          designation,
          bio,
          photoUrl,
          dateOfBirth,
        });

        await BeautyPackageModel.findByIdAndUpdate(bid,{
          $addToSet:{
            specialists:specialist._id
          }
        })

        res.status(200).json(specialist);
      })

    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  // update a specialist
  public async updateSpecialist(req: Request, res: Response): Promise<void> {

    try {
      const { name,
        designation,
        bio,
        photoUrl,
        dateOfBirth,
      } = req.body;
      const { sid } = req.params;
    
      if (!mongoose.Types.ObjectId.isValid(sid)) {
        res.status(404).json({ message: "specialist not found" });
        return
      }

      await Promise.resolve().then(async () => {
        const specialist = await SpecialistModel.findByIdAndUpdate(sid, {
          name,
        designation,
        bio,
        photoUrl,
        dateOfBirth,
        }, { new: true });

        res.status(200).json(specialist);
      })

    } catch (error: unknown) {
      await handleError(error, res);
    }
  }


  // update a specialist
  public async deleteSpecialist(req: Request, res: Response): Promise<void> {

    try {

      const { sid } = req.params;
      if (!mongoose.Types.ObjectId.isValid(sid)) {
        res.status(404).json({ message: "specialist not found" });
        return
      }

      await Promise.resolve().then(async () => {
        const specialist = await SpecialistModel.findByIdAndDelete(sid);
        res.status(200).json(specialist);
      })

    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
}