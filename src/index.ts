import dotenv from "dotenv";
import { app } from "./app.ts";
import connectDB from "./db/index.ts";
dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log(`Server is running on 3000`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB CONNECTION FAILED!", err);
  });
