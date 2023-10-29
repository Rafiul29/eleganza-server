"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const specialistSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    beautyPackages: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "BeautyPackage",
        }
    ]
}, { timestamps: true });
const SpecialistModel = mongoose_1.default.model('Specialist', specialistSchema);
exports.default = SpecialistModel;
