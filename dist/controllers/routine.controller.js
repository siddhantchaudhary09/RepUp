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
exports.routineInfo = exports.deleteroutine = exports.createRoutine = void 0;
const Routine_Model_1 = require("../models/Routine.Model");
const User_model_1 = __importDefault(require("../models/User.model"));
const createRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title } = req.body;
        const userid = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!title || !userid) {
            res.status(400).json({ message: "Please fill in all fields" });
            return;
        }
        const newRoutine = yield Routine_Model_1.Routine.create({ title });
        if (!newRoutine) {
            res.status(500).json({ message: "Routine not created" });
        }
        const user = yield User_model_1.default.findByIdAndUpdate(userid, {
            $push: { routine: newRoutine._id },
        });
        res.status(201).json({
            status: 200,
            message: "Routine created successfully",
            routine: newRoutine,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createRoutine = createRoutine;
const deleteroutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const userid = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!id) {
            res.status(400).json({ message: "Id required" });
            return;
        }
        yield User_model_1.default.findByIdAndUpdate(userid, {
            $pull: { routine: id },
        }, { new: true });
        const deleteroutine = yield Routine_Model_1.Routine.findByIdAndDelete(id);
        if (!deleteroutine) {
            res.status(500).json({ message: "Routine not found" });
        }
        res.status(201).json({
            message: "Routine deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.deleteroutine = deleteroutine;
const routineInfo = (req, // Standard order
res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { routineId } = req.body;
        const routine = yield Routine_Model_1.Routine.findById(routineId).populate({
            path: "excercises",
            populate: {
                path: "Set",
            },
        });
        if (!routine) {
            res.status(404).json({ message: "Routine not found" });
            return;
        }
        res.status(200).json({
            status: 200,
            message: "Routine found",
            routine,
        });
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.routineInfo = routineInfo;
