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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExcercise = exports.createExcercise = void 0;
const Excercise_model_1 = require("../models/Excercise.model");
const Routine_Model_1 = require("../models/Routine.Model");
const Userexcercises_model_1 = require("../models/Userexcercises.model");
const createExcercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { excerciseId, routineId } = req.body;
        const userid = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!excerciseId) {
            res.status(400).json({ message: "Please fill in all fields" });
            return;
        }
        const excercise = yield Userexcercises_model_1.Userexcercises.findById(excerciseId);
        const newexcercise = yield Excercise_model_1.Excercise.create({
            name: excercise === null || excercise === void 0 ? void 0 : excercise.name,
            description: excercise === null || excercise === void 0 ? void 0 : excercise.description,
            category: excercise === null || excercise === void 0 ? void 0 : excercise.category,
            muscle: excercise === null || excercise === void 0 ? void 0 : excercise.muscle,
            userid,
        });
        const routineupdate = yield Routine_Model_1.Routine.findByIdAndUpdate(routineId, {
            $push: { excercises: newexcercise._id },
        }, { new: true }).populate("excercises");
        res.status(201).json(routineupdate);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createExcercise = createExcercise;
const deleteExcercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { excerciseId, routineId } = req.body;
    const userid = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!excerciseId) {
        res.status(400).json({ message: "Please fill in all fields" });
        return;
    }
    yield Excercise_model_1.Excercise.findByIdAndDelete(excerciseId);
    const routineupdate = yield Routine_Model_1.Routine.findByIdAndUpdate(routineId, {
        $pull: { excercises: excerciseId },
    }, { new: true }).populate("excercises");
    res.status(201).json(routineupdate);
});
exports.deleteExcercise = deleteExcercise;
