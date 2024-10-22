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
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, // Request comes first
res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token || req.body.token;
    if (!token) {
        console.log("Token missing");
        res.status(401).json("Token missing");
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET); // Type assertion for decoded
        console.log("Decoded token:", decoded);
        req.user = decoded; // Attach decoded user information to request
        next();
    }
    catch (error) {
        console.log("JWT verification error:", error);
        res.status(401).json("Unauthorized request");
        return;
    }
});
exports.authMiddleware = authMiddleware;
