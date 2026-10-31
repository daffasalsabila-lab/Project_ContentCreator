import express from "express";
import {getAllChannels, getChannelsById, updateChannels, createChannels, deleteChannels} from "../controllers/channelController.js";

import { verifyToken } from "../middlewares/middlewares.js";

const router = express.Router();

router.get("/", verifyToken, getAllChannels);
router.get("/:id", verifyToken, getChannelsById);
router.post("/", verifyToken, createChannels);
router.put("/:id", verifyToken, updateChannels);
router.delete("/:id", verifyToken, deleteChannels);

export default router; 