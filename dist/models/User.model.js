"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Goal = exports.Gender = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Define enums for gender and goal
var Gender;
(function (Gender) {
    Gender["Male"] = "M";
    Gender["Female"] = "F";
})(Gender || (exports.Gender = Gender = {}));
var Goal;
(function (Goal) {
    Goal["FatLoss"] = "fatloss";
    Goal["BodyRecomp"] = "body recomp";
    Goal["MuscleGain"] = "muscle gain";
})(Goal || (exports.Goal = Goal = {}));
// User schema
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    mobile: {
        type: String,
    },
    gender: {
        type: String,
        enum: Object.values(Gender), // Use enum values
    },
    height: {
        type: String,
    },
    weight: {
        type: String,
    },
    goal: {
        type: String,
        enum: Object.values(Goal), // Use enum values
    },
    Userexcercise: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Userexcercises",
        },
    ],
    routine: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Routine",
        },
    ],
}, { timestamps: true });
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
