"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handle_error_1 = require("../errors/handle.error");
const mongoose_1 = __importDefault(require("mongoose"));
const beautyPackage_model_1 = __importDefault(require("../models/beautyPackage.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const booking_model_1 = __importDefault(require("../models/booking.model"));
class BookingController {
    constructor() { }
    // get all specialist
    async createABooking(req, res) {
        var _a;
        try {
            const { bid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(bid)) {
                res.status(404).json({ message: "Beauty package not found" });
                return;
            }
            const user = await user_model_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).populate('bookings');
            // already booked
            const alreadyBooked = user === null || user === void 0 ? void 0 : user.bookings.find((booking) => bid === booking.beautyPackage._id.toString());
            if (alreadyBooked) {
                res.status(403).json({ message: "Beauty package already booked" });
                return;
            }
            await Promise.resolve().then(async () => {
                var _a, _b;
                const booking = await booking_model_1.default.create({
                    beautyPackage: bid,
                    user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id
                });
                await beautyPackage_model_1.default.findByIdAndUpdate(bid, {
                    $addToSet: {
                        bookings: booking._id
                    }
                });
                await user_model_1.default.findByIdAndUpdate((_b = req.user) === null || _b === void 0 ? void 0 : _b._id, {
                    $addToSet: {
                        bookings: booking._id
                    }
                });
                res.status(200).json(booking);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    // delete booking
    async deleteABooking(req, res) {
        var _a;
        try {
            const { bid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(bid)) {
                res.status(404).json({ message: "Booking not found" });
                return;
            }
            const existedBooking = await booking_model_1.default.findById(bid);
            if (!existedBooking) {
                res.status(403).json({ message: "Booking doesn't exist" });
                return;
            }
            const user = await user_model_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
            const matchBooking = user === null || user === void 0 ? void 0 : user.bookings.find((booking) => bid === booking._id.toString());
            if (!matchBooking) {
                res.status(403).json({ message: "Booking doesn't exist" });
                return;
            }
            await Promise.resolve().then(async () => {
                const booking = await booking_model_1.default.findByIdAndDelete(bid);
                res.status(200).json(booking);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    // get all bookings
    async getAllBookings(req, res) {
        try {
            await Promise.resolve().then(async () => {
                const bookings = await booking_model_1.default.find({}).populate("user beautyPackage");
                res.status(200).json(bookings);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
}
exports.default = BookingController;
