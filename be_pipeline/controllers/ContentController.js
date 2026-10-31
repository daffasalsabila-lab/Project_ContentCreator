import pool from "../config/db.js";
import { createContentSchema } from "../validations/createContentValidation.js";

export const getAllContents = async (req, res) => {
    try {
        const userId = req.user.id;
        const { status, channels_id } = req.query;

        let sql = (`SELECT id, user_id, channels_id, title,	description, script_draft, format_type,	status,	priority, scheduled_date, published_date, published_url, created_at, updated_at	FROM contents WHERE user_id = ?`); 
        
        const params = [userId]

        if(status) {
            const allowedStatus = [ "idea","scripting","recording","editing","ready","published"];
        
        if(!allowedStatus.includes(status)) {
            return res.status(400).json({
                status: false,
                message: "Invalid content status",
            });
        }

        sql += " AND status = ?";
        params.push(status);

        }

        if(channels_id) {
            if(!/^[1-9]\d*$/.test(channels_id)){
                return res.status(400).json({
                    status: false,
                    message: "Invalid channel ID",
                });
            }
            sql += " AND channels_id = ?";
            params.push(channels_id);
        }

        sql += " ORDER BY id DESC";

        const [contents] = await pool.query(sql, params);

        return res.status(200).json({
            status: true,
            message: "Contents retrieved successfully", 
            data: contents,
        });

    } catch (error) {
        console.error("Get contents error:", error.message);

        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
};

export const getContentsById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        parseInt(id)
        const [contents] = await pool.query("SELECT * FROM contents INNER JOIN content_checklists ON contents.id = content_checklists.content_id INNER JOIN content_metrics ON contents.id = content_metrics.content_id WHERE contents.id = ?", [id]);

        if(contents.length === 0 || content[0].id !== id) {
            return res.status(404).json({
                status: false,
                message: "Content not found",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Content retrieved successfully",
            data: contents,
        });
    } catch (error) {
        console.error("Get contents by ID error:", error.message);

        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
};

export const createContents = async (req, res) => {
    try {
        const { error, value } = createContentSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                status: false,
                message: error.details[0].message,
            });
        }

        const userId = req.user.id;
        const {
            channels_id, title, description, script_draft,
            format_type, priority, scheduled_date,
        } = value;

        const [channels] = await pool.query(
            "SELECT id FROM channels WHERE id = ? AND user_id = ?",
            [channels_id, userId]
        );

        if (!channels.length) {
            return res.status(404).json({
                status: false,
                message: "Channel not found",
            });
        }

        const [result] = await pool.query(
            `INSERT INTO contents
            (user_id, channels_id, title, description, script_draft,
             format_type, status, priority, scheduled_date)
            VALUES (?, ?, ?, ?, ?, ?, 'idea', ?, ?)`,
            [
                userId, channels_id, title, description ?? null,
                script_draft ?? null, format_type, priority,
                scheduled_date ?? null,
            ]
        );

        const [contents] = await pool.query(
            "SELECT * FROM contents WHERE id = ? AND user_id = ?",
            [result.insertId, userId]
        );

        return res.status(201).json({
            status: true,
            message: "Content created successfully",
            data: contents[0],
        });
    } catch (error) {
        console.error("Create content error:", error);

        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
};

export const updateContents = async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { status }  = req.body;
        if(!status) {
            return res.status(400).json({
                status: false,
                message: "Missing required field: status"
            });
        }
        await pool.query("UPDATE contents SET status = ? WHERE id = ?", [status, id]);
        return res.status(200).json({
            status: true,
            message: "Content status updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}

export const deleteContents = async (req, res) => {
    try {
        // const 
    } catch (error) {
        
    }
}




// try {
//     const userId = req.user.id;
//     const  {channel_id, title, description, script_draft, format_type, status, priority, scheduled_date, published_date, published_url} = req.body = req.body;

//     // validasi input wajib
//     if(!channel_id || !title || !description || !script_draft || !format_type || !status || !priority) 
    // {
    //     return res.status(400).json({
    //         status: false,
    //         message: "Channel ID, title, and format type are required",
    //     });
    // }
//     } catch (error) {
    
//     }