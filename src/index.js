import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import globalRoute from "./routes/global.route.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware 
app.use(express.json());
app.use(cors());

// Routes 
app.use("/api/",globalRoute);

// default route 
app.get("/",(req,res) => {
    res.redirect("https://specsaura.com/");
})

app.listen(PORT, () => {
    console.log(`Server is Running on http:/localhost:${PORT}`);
});
