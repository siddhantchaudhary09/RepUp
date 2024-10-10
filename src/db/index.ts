import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connnectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}`
    );
    console.log(
      `\n MONGODB CONNECTED!! DB HOST: ${connnectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGO DB CONNECTION ERROR ", error);
    process.exit(1);
  }
};

export default connectDB;
