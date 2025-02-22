import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware 
app.use(express.json());
app.use(cors());

// Routes 
app.use("/api/user",userRoute);

app.listen(PORT, () => {
    console.log(`Server is Running on http:/localhost:${PORT}`);
});
