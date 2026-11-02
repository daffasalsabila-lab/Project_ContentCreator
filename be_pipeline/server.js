
import express from"express";
// import pool from"./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
import checklistRoutes from "./routes/checklistRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import metricRoutes from "./routes/metricRoutes.js";

dotenv.config();

const app = express();
const PORT = 3000;


app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
// Routes nya
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/channels", channelRoutes);
app.use("/api/v1/checklists", checklistRoutes);
app.use("/api/v1/contents", contentRoutes);
app.use("/api/v1/metrics", metricRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Backend Creator Content Pipeline Tracker berhasil berjalan!"
    });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
