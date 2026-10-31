
import express from"express";
// import pool from"./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
// import checklistRoutes from "./routes/checklistRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/channels", channelRoutes);
// app.use("/api/v1/checklist", checklistRoutes);
app.use("/api/v1/contents", contentRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Backend Creator Content Pipeline Tracker berhasil berjalan!"
    });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
