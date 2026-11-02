import express from "express";
import { getMetricsByContentId, getMetricById } from "../controllers/MetricController.js";
import { verifyToken } from "../middlewares/middlewares.js";

const router = express.Router();

// GET /api/v1/metrics/:id
router.get("/:id", verifyToken, getMetricById);

export default router;


// import express from "express";
// import { createMetric, getMetricsByContentId, getMetricById } from "../controllers/MetricController.js";
// import { verifyToken } from "../middlewares/middlewares.js";

// const router = express.Router();

// // GET /api/v1/metrics/:id
// router.post("/:id/metrics", verifyToken, createMetric);
// router.get("/:id", verifyToken, getMetricsByContentId);
// // router.get("/:id/metrics", verifyToken, getMetricsByContentId);
// router.get("/:id", verifyToken, getMetricById);

// export default router;
