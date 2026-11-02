import express from "express";

import {
    getAllChecklists,
    addChecklist,
    toggleChecklists
} from "../controllers/checklistController.js";

import { verifyToken } from "../middlewares/middlewares.js";

const router = express.Router();

// Mengambil semua checklist berdasarkan content_id
router.get("/checklists", verifyToken, getAllChecklists);

// Menambahkan checklist baru ke dalam konten
router.post("/contents/:id/checklists", verifyToken, addChecklist);

// Mengubah status checklist (selesai / belum selesai)
router.patch("/checklists/:id/toggle", verifyToken, toggleChecklists);

export default router;