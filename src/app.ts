import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json, urlencoded } from "express";
import fileUpload from "express-fileupload";
import userRouter from "./routes/user.routes.ts";

const app = express();

// Middleware setup
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

export { app };
