import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import fileUpload from "express-fileupload";
import excerciseRouter from "./routes/excercise.routes.ts";
import routineRouter from "./routes/routine.routes.ts";
import setRouter from "./routes/set.routes.ts";
import userRouter from "./routes/user.routes.ts";
dotenv.config();

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(json({ limit: "16kb" }));
app.use(urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "server on all ok part-2 .   " });
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/routine", routineRouter);
app.use("/api/v1/excercise", excerciseRouter);
app.use("/api/v1/set", setRouter);

export { app };