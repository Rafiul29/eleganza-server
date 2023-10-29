"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = async (error, res) => {
    try {
        await Promise.reject(error);
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({ message: err.message });
        }
        else {
            return res.status(400).json({ message: "Something went wrong!!" });
        }
    }
};
exports.handleError = handleError;
