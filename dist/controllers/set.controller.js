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
exports.deleteSet = exports.updateSet = exports.createSet = void 0;
const Excercise_model_1 = require("../models/Excercise.model");
const Set_model_1 = require("../models/Set.model");
const createSet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { excerciseId, sno } = req.body;
        if (!excerciseId || !sno) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        const Newset = yield Set_model_1.Set.create({
            sno,
        });
        const excercise = yield Excercise_model_1.Excercise.findByIdAndUpdate(excerciseId, {
            $push: { Set: Newset._id },
        }, { new: true }).populate("Set");
        res.status(201).json(excercise);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Error in creating set" });
        return;
    }
});
exports.createSet = createSet;
const updateSet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { weight, reps, setid } = req.body;
    if (!weight || !reps || !setid) {
        res.status(400).json({ message: "Missing required fields" });
        return;
    }
    try {
        const set = yield Set_model_1.Set.findByIdAndUpdate(setid, {
            weight,
            reps,
        });
        res.status(200).json(set);
    }
    catch (error) {
        res.status(500).json({ message: "Error in updating set" });
        return;
    }
});
exports.updateSet = updateSet;
const deleteSet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        res.status(500).json({ message: "Error in deleting set" });
        return;
    }
});
exports.deleteSet = deleteSet;
