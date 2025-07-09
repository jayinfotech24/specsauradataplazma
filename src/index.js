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

app.post("/webhook", (req, res) => {
    const event = req.headers["x-github-event"];
    const scriptPath = "/root/specsauradataplazma/deploy.sh";

    console.log("🔔 Webhook hit. Event:", event);

    if (event === "push") {
        exec(`sh ${scriptPath}`, (error, stdout, stderr) => {
            if (error) {
                console.error("❌ Exec error:", error.message);
                console.error("❌ stderr:", stderr);
                res.status(500).send("Deploy failed");
                return;
            }

            console.log("✅ stdout:", stdout);
            res.status(200).send("Deploy success");
        });
    } else {
        console.log("⛔ Not a push event");
        res.status(400).send("Not a push event");
    }
});

// Default redirect route
app.get("/", (req, res) => {
    res.redirect("https://specsaura.com/");
});

// Server Start
app.listen(PORT, () => {
    console.log("123456789");
    console.log(`Server is running on http://localhost:${PORT}`);
});
