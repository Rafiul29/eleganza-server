"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const beautyPackageSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required: true,
        }
    ],
    price: {
        type: Number,
        required: true,
    },
    specialists: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Specialist",
        }
    ],
    bookings: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Booking",
        }
    ]
}, { timestamps: true });
const BeautyPackageModel = mongoose_1.default.model('BeautyPackage', beautyPackageSchema);
exports.default = BeautyPackageModel;
