import pool from "../config/db.js";


// getAll
export const getAllChannels = async (req, res) => {
    try {
        const [channels] = await pool.query(`SELECT id, user_id, platform, handle_name, created_at
        FROM channels
        WHERE user_id = ?
        ORDER BY id DESC`,[userId]);

        return res.status(200).json({
            status: true,
            message: "Channels successfully",
            data: channels,
        });
    } catch (error) {
        console.error("Get channels error:", error.message);
        return res.status(500).json({
            status: false,
            message: error.message
        });
    };
};

// getOne
export const getChannelsById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
       const [channels] = await pool.query("SELECT * FROM channels WHERE id = ?", [id]);
       if(channels.length === 0){
            return res.status(404).json({
              status: false,
              message: "Channel not found",
            });
          };
        return res.status(200).json({
            status: true,
            message: "Channels successfully",
            data: channels,
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}

export const createChannels = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { platform, handle_name } = req.body;

        if(!platform, !handle_name) {
            return res.status(400).json({
                status: false,
                messaage: "Platform and handle_name must be required",
            });
        }
        const [channels] = await pool.query(`INSERT INTO channels (user_id, platform, handle_name) VALUES (?, ?, ?)`,[user_id, platform.trim(), handle_name.trim()]);
        return res.status(201).json({
            status: true,
            message: "Channels created successfully",
            data: {
                user: {
                    id: channels.insertId,
                    user_id,
                    platform,
                    handle_name,
                },
        });
    } catch (error) {
        
    }
}