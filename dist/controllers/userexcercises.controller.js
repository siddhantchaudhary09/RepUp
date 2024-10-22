"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerExercise = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const Userexcercises_model_1 = require("../models/Userexcercises.model");
const registerExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { name, description, category, muscle } = req.body;
        if (!name || !category || !muscle) {
            res.status(400).json({ message: "Please fill in all fields" });
        }
        const newExercise = yield Userexcercises_model_1.Userexcercises.create({
            name,
            description,
            category,
            muscle,
        });
        const updatedUser = yield User_model_1.default.findByIdAndUpdate(userid, { $push: { Userexcercise: newExercise._id } }, { new: true });
        res.status(201).json({
            status: 200,
            message: "Exercise created",
            exercise: newExercise,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.registerExercise = registerExercise;
