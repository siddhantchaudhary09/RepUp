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
exports.getCurrentUser = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = __importDefault(require("../models/User.model"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username, age, gender, goal, height, weight } = req.body;
        if (!email ||
            !password ||
            !username ||
            !age ||
            !gender ||
            !goal ||
            !height ||
            !weight) {
            res.status(400).json({ message: "Please fill in all fields" });
            return;
        }
        const presentUser = yield User_model_1.default.findOne({ email });
        if (presentUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new User_model_1.default({
            email,
            password: hashedPassword,
            username,
            age,
            gender,
            goal,
            mobile: "",
            height,
            weight,
        });
        yield newUser.save();
        newUser.password = "";
        res
            .status(201)
            .json({ message: "User created successfully", user: newUser });
    }
    catch (error) {
        console.error(error); // For internal debugging
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res.status(400).json({ message: "Please fill in all fields" });
            return;
        }
        const LoginUser = yield User_model_1.default.findOne({ email })
            .populate("Userexcercise")
            .populate("routine");
        if (!LoginUser) {
            res.status(400).json({ message: "User does not exist" });
            return;
        }
        if (yield bcrypt_1.default.compare(password, LoginUser.password)) {
            const payload = {
                email: LoginUser.email,
                id: LoginUser._id,
            };
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
            LoginUser.token = token;
            LoginUser.password = "";
            const options = {
                expires: new Date(Date.now() + 3600 * 1000), // Example expiry date
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Use one of the allowed values
                httpOnly: true,
                secure: true,
            };
            res
                .cookie("token", token, options)
                .status(200)
                .json({ user: LoginUser, message: "Logged in successfully" });
            return;
        }
        else {
            res.status(400).json("Password is incorrect");
            return;
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json("Login failed, try again later");
        return;
    }
});
exports.loginUser = loginUser;
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req === null || req === void 0 ? void 0 : req.user;
    // Retrieve the user from the database if needed (optional)
    const userdb = yield User_model_1.default.findById(user === null || user === void 0 ? void 0 : user.id)
        .populate("Userexcercise")
        .populate("routine");
    if (!userdb) {
        res.status(404).json({ status: 404, message: "User not found." });
    }
    res.status(200).json({
        status: 200,
        user: userdb,
        message: "User retrieved successfully.",
    });
});
exports.getCurrentUser = getCurrentUser;
