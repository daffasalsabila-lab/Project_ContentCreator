import pool from "../config/db.js";

// Helper: validasi ID positif
const isValidId = (id) => /^[1-9]\d*$/.test(String(id));

// helper: response error 
const sendError = (res, status, message) => {
    return res.status(status).json({
        status: false,
        message: message
    });
};

// Helper: cek apakah content dimiliki oleh user
const canAccessContent = async (contentId, user) => {
    const [content] = await pool.query(
        `SELECT id FROM contents
         WHERE id = ?
           AND (user_id = ? OR (? = 'editor' AND editor_id = ?))`,
        [contentId, user.id, user.role, user.id]
    );
    return content.length > 0;
};

export const createMetric = async (req, res) => {
    try {
        const contentId = req.params.id;
        const userId = req.user.id;

        const {
            views_count = 0,
            likes_count = 0,
            comments_count = 0,
            shares_count = 0,
        } = req.body;
        
        if(!isValidId(contentId)) {
            return sendError(res, 400, "Invalid content ID");
        }
        const counts = {
            views_count, likes_count, comments_count, shares_count,
        };

        for (const[key, value] of Object.entries(counts)) {
            if (!Number.isSafeInteger(value) || value < 0
        ) {
            return sendError(res, 400, `${key} must be a non-negative integer`
            );
        }
    }

    const isOwned = await canAccessContent(contentId, req.user);
    if(!isOwned) {
        return sendError(res, 404, "Content not found");
    }
    const [result] = await pool.query(
            `INSERT INTO content_metrics
             (content_id, recorded_at, views_count, likes_count,
              comments_count, shares_count)
             VALUES (?,CURDATE(),?, ?, ?, ?)`,
            [
                contentId,
                views_count,
                likes_count,
                comments_count,
                shares_count,
            ]
        );

    const [rows] = await pool.query(`SELECT id, content_id, recorded_at, views_count, likes_count, comments_count, shares_count FROM content_metrics WHERE id = ?`, [result.insertId]);
    return res.status(201).json({
        status: true,
        message: "Metrics successfully recorded",
        data: rows[0],
    });
    
    }catch (error) {
        console.error("CreateMetric error:", error.message);
        return sendError(res, 500, "Internal server error");
    }
};

// GET /api/v1/contents/:id/metrics
export const getMetricsByContentId = async (req, res) => {
    try {
        const contentId = req.params.id;
        const userId = req.user.id;

        if (!isValidId(contentId)) {
            return sendError(res, 400, "Invalid content ID");
        }

        const isOwned = await canAccessContent(
            contentId,
            req.user
        );

        if (!isOwned) {
            return sendError(res, 404, "Content not found");
        }
        
        const [rows] = await pool.query(
            `SELECT id, content_id, recorded_at, views_count, likes_count, comments_count, shares_count
             FROM content_metrics
             WHERE content_id = ?
             ORDER BY recorded_at DESC`,
            [contentId]
        );
        return res.status(200).json({
            status: true,
            message: "Metrics successfully retrieved",
            data: rows,
        });
    } catch (error) {
        console.error("getMetricsByContentId error:", error.message);
        return sendError(res, 500, "Internal server error");
    }
};

// GET /api/v1/metrics/:id
export const getMetricById = async (req, res) => {
    try {
        const metricId = req.params.id;
        const userId = req.user.id;

        if(!isValidId(metricId)) {
            return sendError(res, 400, "Invalid metric ID");
        }
        const [rows] = await pool.query(
            `SELECT m.id, m.content_id, m.recorded_at, m.views_count, m.likes_count, m.comments_count, m.shares_count
             FROM content_metrics m
             JOIN contents c ON m.content_id = c.id
             WHERE m.id = ?
               AND (c.user_id = ? OR (? = 'editor' AND c.editor_id = ?))`,
            [metricId, userId, req.user.role, userId]
        );
        if (rows.length === 0) {
            return sendError(res, 404, "Metric not found");
        }
        return res.status(200).json({
            status: true,
            message: "Metric successfully retrieved",
            data: rows[0],
        });
    } catch (error) {
        console.error("getMetricById error:", error.message);
        return sendError(res, 500, "Internal server error");
    }
};