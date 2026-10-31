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
        // const user_id = req.user.id;
        const { user_id,platform, handle_name } = req.body;

        if(!user_id, !platform, !handle_name) {
            return res.status(400).json({
                status: false,
                messaage: "user_id, platform and handle_name must be required",
            });
        }
        const [channels] = await pool.query(`INSERT INTO channels (user_id, platform, handle_name) VALUES (?, ?, ?)`,[user_id, platform.trim(), handle_name.trim()]);
        return res.status(201).json({
            status: true,
            message: "Channels created successfully",
            data: {
                id: channels.insertId,
                user_id,
                platform,
                handle_name
            }
        });
    } catch (error) {
        // ini untuk kalo si user udah pernah pakai nama channel nya, jadi error
        if(error.code === ER_DUP_ENTRY){
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
        const id = parseInt(req.params.id);
        const { user_id, platform, handle_name } = req.body;
        await pool.query("UPDATE channels SET user_id = ?, platform = ?,handle_name = ?, WHERE id ?", [user_id, platform, handle_name, id]);
            return res.status(200).json({
                status: true,
                message: "Channels successfully",   
            })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

// DELETE: Menghapus channel berdasarkan ID
export const deleteChannels = async (req, res) => {
    try {
        // const userId = req.user.id;
        const { id } = req.params;

        // Validasi ID
        if(!user_id, !platform, !handle_name < 1) {
            return res.status(400).json({
                success: false,
                message: "Invalid channel ID",
            });
        }

        // Periksa apakah channel milik user
        const [existingChannels] = await pool.query(
            `SELECT id FROM channels
             WHERE id = ? AND user_id = ?`,
            [id, userId]
        );

        if (existingChannels.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Channel not found",
            });
        }

        // Hapus channel
        await pool.query(
            `DELETE FROM channels
             WHERE id = ? AND user_id = ?`,
            [id, userId]
        );

        return res.status(200).json({
            success: true,
            message: "Channel deleted successfully",
        });

    } catch (error) {
        console.error("Delete channel error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};