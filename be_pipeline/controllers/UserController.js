import pool from "../config/db.js";

export const getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query(`
            SELECT id, name, email, role, created_at
            FROM users
            ORDER BY created_at DESC
        `);

    return res.status(200).json({
      status: true,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to retrieve users",
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const allowedRoles = ["creator", "editor", "admin"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    if (Number(id) === Number(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: "You cannot change your own role",
      });
    }

    const [result] = await pool.query(
      "UPDATE users SET role = ? WHERE id = ?",
      [role, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User role updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update user role",
    });
  }
};
