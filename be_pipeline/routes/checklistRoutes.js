
import express from "express";
import { getAllChecklists, toggleChecklists} from "../controllers/checklistController.js";
import { verifyToken } from "../middlewares/middlewares.js";

const router = express.Router();

router.get("/", verifyToken, getAllChecklists);
router.patch("/:id/toggle", verifyToken, toggleChecklists);

export default router;
