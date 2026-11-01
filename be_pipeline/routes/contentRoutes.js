import express from "express";
import { getAllContents, getContentsById, createContents, updateContents, deleteContents} from "../controllers/ContentController.js";

import { verifyToken } from "../middlewares/middlewares.js";
import { addChecklist } from "../controllers/checklistController.js";
import { createMetric, getMetricsByContentId } from "../controllers/MetricController.js";

const router = express.Router();

router.get("/", verifyToken, getAllContents);
router.get("/:id", verifyToken, getContentsById);
router.post("/", verifyToken, createContents);
router.put("/:id", verifyToken, updateContents);
router.delete("/:id", verifyToken, deleteContents);
router.post("/:id/checklists", verifyToken, addChecklist);
router.post("/:id/metrics", verifyToken, createMetric);
router.get("/:id/metrics", verifyToken, getMetricsByContentId);

export default router; 