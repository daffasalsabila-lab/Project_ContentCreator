import pool from "../config/db.js";


// getAll
// export const getAllChannels = async (req, res) => {
//     try {
//         const [channels] = await pool.query(`SELECT id, user_id, platform, handle_name, created_at
//         FROM channels
//         WHERE user_id = ?
//         ORDER BY id DESC`,[userId]);

//         return res.status(200).json({
//             status: true,
//             message: "Channels successfully",
//             data: channels,
//         });
//     } catch (error) {
//         console.error("Get channels error:", error.message);
//         return res.status(500).json({
//             status: false,
//             message: error.message
//         });
//     };
// };

export const getAllChannels = async (req, res) => {
    try {
        const userId = req.user.id;

        const [channels] = await pool.query(
            `SELECT id, user_id, platform, handle_name, created_at
             FROM channels
             WHERE user_id = ?
             ORDER BY id DESC`,
            [userId]
        );

        return res.status(200).json({
            status: true,
            message: "Channels retrieved successfully",
            data: channels,
        });

    } catch (error) {
        console.error("Get channels error:", error.message);

        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
};

// getById
export const getChannelsById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                status: false,
                message: "Invalid channel ID",
            });
        }

        const [channels] = await pool.query(
            "SELECT id, user_id, platform, handle_name, created_at FROM channels WHERE id = ? AND user_id = ?",
            [id, req.user.id]
        );

        if (channels.length === 0) {
            return res.status(404).json({
                status: false,
                message: "Channel not found",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Channel retrieved successfully",
            data: channels[0],
        });
    } catch (error) {
        console.error("Get channel by ID error:", error.message);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
}

export const createChannels = async (req, res) => {
    try {
        const userId = req.user.id;
        const { platform, handle_name } = req.body;

        if (typeof platform !== "string" || !platform.trim() ||
            typeof handle_name !== "string" || !handle_name.trim()) {
            return res.status(400).json({
                status: false,
                message: "Platform and handle name are required",
            });
        }

        const [channels] = await pool.query(
            "INSERT INTO channels (user_id, platform, handle_name) VALUES (?, ?, ?)",
            [userId, platform.trim(), handle_name.trim()]
        );

        const [createdChannels] = await pool.query(
            "SELECT id, user_id, platform, handle_name, created_at FROM channels WHERE id = ? AND user_id = ?",
            [channels.insertId, userId]
        );

        return res.status(201).json({
            status: true,
            message: "Channels created successfully",
            data: createdChannels[0],
        });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
                status: false,
                message: "Channel already exists",
            });
        }
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
}

export const updateChannels = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const userId = req.user.id;
        const { platform, handle_name } = req.body;

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                status: false,
                message: "Invalid channel ID",
            });
        }

        if (typeof platform !== "string" || !platform.trim() ||
            typeof handle_name !== "string" || !handle_name.trim()) {
            return res.status(400).json({
                status: false,
                message: "Platform and handle name are required",
            });
        }

        const [result] = await pool.query(
            "UPDATE channels SET platform = ?, handle_name = ? WHERE id = ? AND user_id = ?",
            [platform.trim(), handle_name.trim(), id, userId]
        );

        if (result.affectedRows === 0) {
            const [existing] = await pool.query(
                "SELECT id FROM channels WHERE id = ? AND user_id = ?",
                [id, userId]
            );
            if (existing.length === 0) {
                return res.status(404).json({
                    status: false,
                    message: "Channel not found",
                });
            }
        }

        return res.status(200).json({
            status: true,
            message: "Channel updated successfully",
        });
    } catch (error) {
        console.error("Update channel error:", error.message);
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
                status: false,
                message: "Channel already exists",
            });
        }
        return res.status(500).json({
            status: false,
            message: "Internal server error",
        })
    }
}

// DELETE: Menghapus channel berdasarkan ID
export const deleteChannels = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const userId = req.user.id;

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                status: false,
                message: "Invalid channel ID",
            });
        }

        const [result] = await pool.query(
            "DELETE FROM channels WHERE id = ? AND user_id = ?",
            [id, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: false,
                message: "Channel not found",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Channel deleted successfully",
        });

    } catch (error) {
        console.error("Delete channel error:", error.message);

        if (error.code === "ER_ROW_IS_REFERENCED_2") {
            return res.status(409).json({
                status: false,
                message: "Channel cannot be deleted while it is used by content",
            });
        }

        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
};