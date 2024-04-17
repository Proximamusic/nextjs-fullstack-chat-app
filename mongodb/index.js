import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Database is already connected!");
    return;
  }
  try {
    await mongoose.connect(
      "mongodb+srv://shubham_chat_app:Never%40123@cluster0.nrhoong.mongodb.net/?retryWrites=true&w=majority",
      {
        dbName: "nextjsChatApp",
        useNewUrlParser: true,
        // useUnifiedTopology: true,
      }
    );
    isConnected = true;
    console.log("database connection established");
  } catch (error) {
    console.log(error);
  }
};
