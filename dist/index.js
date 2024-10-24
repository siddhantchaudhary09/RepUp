"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./app");
const index_1 = __importDefault(require("./db/index"));
dotenv_1.default.config({
    path: "./.env",
});
(0, index_1.default)()
    .then(() => {
    app_1.app.listen(process.env.PORT, () => {
        console.log(`Server is running on 3000`);
    });
})
    .catch((err) => {
    console.log("MONGO DB CONNECTION FAILED!", err);
});
