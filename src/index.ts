import dotenv from "dotenv";
import { app } from "./app";
import connectDB from "./db/index";
dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on 3000`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB CONNECTION FAILED!", err);
  });
