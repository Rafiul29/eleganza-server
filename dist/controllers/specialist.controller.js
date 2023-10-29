"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handle_error_1 = require("../errors/handle.error");
const mongoose_1 = __importDefault(require("mongoose"));
const specialist_mode_1 = __importDefault(require("../models/specialist.mode"));
const beautyPackage_model_1 = __importDefault(require("../models/beautyPackage.model"));
class SpecialistController {
    constructor() { }
    // get all specialist
    async getAllSpecialist(req, res) {
        try {
            await Promise.resolve().then(async () => {
                const specialists = await specialist_mode_1.default.find({});
                res.status(200).json(specialists);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    // get a specialist
    async getSpecialist(req, res) {
        try {
            const { sid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(sid)) {
                res.status(404).json({ message: "specialist not found" });
                return;
            }
            await Promise.resolve().then(async () => {
                const specialist = await specialist_mode_1.default.findById(sid);
                res.status(200).json(specialist);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    // create a specialist
    async createSpecialist(req, res) {
        try {
            const { name, designation, bio, photoUrl, dateOfBirth, } = req.body;
            const { bid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(bid)) {
                res.status(404).json({ message: "Beauty package not found" });
                return;
            }
            await Promise.resolve().then(async () => {
                const specialist = await specialist_mode_1.default.create({
                    name,
                    designation,
                    bio,
                    photoUrl,
                    dateOfBirth,
                });
                await beautyPackage_model_1.default.findByIdAndUpdate(bid, {
                    $addToSet: {
                        specialists: specialist._id
                    }
                });
                res.status(200).json(specialist);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    // update a specialist
    async updateSpecialist(req, res) {
        try {
            const { name, designation, bio, photoUrl, dateOfBirth, } = req.body;
            const { sid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(sid)) {
                res.status(404).json({ message: "specialist not found" });
                return;
            }
            await Promise.resolve().then(async () => {
                const specialist = await specialist_mode_1.default.findByIdAndUpdate(sid, {
                    name,
                    designation,
                    bio,
                    photoUrl,
                    dateOfBirth,
                }, { new: true });
                res.status(200).json(specialist);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    // update a specialist
    async deleteSpecialist(req, res) {
        try {
            const { sid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(sid)) {
                res.status(404).json({ message: "specialist not found" });
                return;
            }
            await Promise.resolve().then(async () => {
                const specialist = await specialist_mode_1.default.findByIdAndDelete(sid);
                res.status(200).json(specialist);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
}
exports.default = SpecialistController;
