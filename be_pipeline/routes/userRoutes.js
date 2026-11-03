import express from "express";
import { getAllUsers, updateUserRole } from "../controllers/UserController.js";

import { authenticateToken } from "../middlewares/authmiddlewares.js";
import { authorizeRole } from "../middlewares/rolemiddlewares.js";

const router = express.Router();

router.get("/", authenticateToken, authorizeRole("admin"), getAllUsers);

router.patch( "/:id/role",
  authenticateToken,
  authorizeRole("admin"),
  updateUserRole,
);

export default router;
