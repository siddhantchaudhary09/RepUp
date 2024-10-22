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
exports.createSet = void 0;
const Excercise_model_1 = require("../models/Excercise.model");
const Set_model_1 = require("../models/Set.model");
const createSet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { weight, reps, excerciseId } = req.body;
        if (!weight || !reps || !excerciseId) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        const Newset = yield Set_model_1.Set.create({
            weight,
            reps,
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
