
import express from"express";
// import pool from"./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Backend Creator Content Pipeline Tracker berhasil berjalan!"
    });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
