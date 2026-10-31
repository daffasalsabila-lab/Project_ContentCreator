import pool from "../config/db.js";

// Helper: validasi ID positif
const isValidId = (id) => /^[1-9]\d*$/.test(String(id));

// Helper: response error
const sendError = (res, status, message) => {
    return res.status(status).json({
        status: false,
        message,
    });
};

// Helper: cek kepemilikan content
const isContentOwnedByUser = async (contentId, userId) => {
    const [rows] = await pool.query(
        "SELECT id FROM contents WHERE id = ? AND user_id = ?",
        [contentId, userId]
    );

    return rows.length > 0;
};
export const getAllChecklists = async (req, res) => {
    try {
        const { content_id } = req.query;
        const userId = req.user.id;

        // validasi content_id
        if(!isValidId(content_id)) {
            return sendError(res, 400, "Content_id must be populated with a valid ID");
            // "Content_id harus diisi dengan ID yang valid"
        }
        const isOwned = await isContentOwnedByUser(content_id, userId);
        if(!isOwned){
            return sendError(res, 404, "Content not found");
        }

        const [checklists] = await pool.query(
            'SELECT id, content_id, task_name, is_completed, created_at FROM content_checklists WHERE content_id=? ORDER BY id ASC', [content_id]
        );

        return res.status(200).json({
            status: true,
            message: "Checklist successfully retrieved",
            data: checklists,
        });
    } catch (error) {
        console.error("getAllChecklists error:", error);
        return sendError(res, 500, "Internal server error");
    }
};

// // POST /api/v1/contents/:id/checklists
export const addChecklist = async(req, res) => {
    try {
        const contentId = req.params.id;
        const userId = req.user.id;
        const { task_name } = req.body;

        if (typeof task_name !== "string" || !task_name.trim()) {
            return sendError(res, 400, "task_name is required");
        }

        if(!isValidId(contentId)) {
            return sendError(res, 400, "Invalid content ID");
        }

        const isOwned = await isContentOwnedByUser(contentId, userId);
        if (!isOwned) {
        return sendError(res, 404, "Content not found");
        }

        const [insertResult] = await pool.query(
        `INSERT INTO content_checklists
        (content_id, task_name, is_completed)
        VALUES (?, ?, 0)`,
        [contentId, task_name.trim()]
        );

        const [checklistRows] = await pool.query(
        `SELECT id, content_id, task_name, is_completed, created_at
        FROM content_checklists
        WHERE id = ?`,
        [insertResult.insertId]
        );


        return res.status(201).json({
            status: true,
            message: "Checklist successfully added",
            data: checklistRows[0],
        });
    } catch (error) {
        console.error("addChecklists error:", error);
        return sendError(res, 500, "Internal server error")
    }
};

export const toggleChecklists = async(req, res) => {
    try {
        const checklistId = req.params.id;
        const userId = req.user.id;

        if(!isValidId(checklistId)) {
            return sendError(res, 400, "Invalid checklist ID")
        }

        const [rows] = await pool.query(
            `SELECT cc.id, cc.is_completed
            FROM content_checklists cc
            JOIN contents c ON c.id = cc.content_id
            WHERE cc.id = ? AND c.user_id = ?`,
            [checklistId, userId]
        );

        if (rows.length === 0) {
        return sendError(res, 404, "Checklist not found");
        }

        const nextStatus = Number(rows[0].is_completed) === 1 ? 0 : 1;

        await pool.query(`UPDATE content_checklists SET is_completed = ? WHERE id = ?`, [nextStatus, checklistId]
        );

        return res.status(200).json({
        status: true,
        message: "Checklist status successfully updated",
        data: {
            id: Number(checklistId),
            is_completed: nextStatus,
        },
    });
    } catch (error) {
        console.error("toggleChecklist error:", error);
        return sendError(res, 500, "Internal server error");
    }
};