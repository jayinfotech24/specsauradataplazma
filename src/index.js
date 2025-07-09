import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { exec } from "child_process";
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
app.use("/api/", globalRoute);

// GitHub Webhook Route
app.post("/webhook", (req, res) => {
    const event = req.headers["x-github-event"];
    
    if (event === "push") {
        exec("sh ./deploy.sh", (err, stdout, stderr) => {
            if (err) {
                console.error(`Deploy error: ${stderr}`);
                return res.status(500).send("Deploy failed");
            }
            console.log(`Deploy success: ${stdout}`);
            return res.status(200).send("Deploy success");
        });
    } else {
        res.status(400).send("Not a push event");
    }
});

// Default redirect route
app.get("/", (req, res) => {
    res.redirect("https://specsaura.com/");
});

// Server Start
app.listen(PORT, () => {
    console.log(`Server is running in NODE.JS`);
    console.log(`Server is running on http://localhost:${PORT}`);
});
