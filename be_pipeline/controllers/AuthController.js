import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../config/db.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Email and password required",
      });
    }

    // Menggunakan penangkapan hasil query database yang aman
    const [rows] = await pool.query(
      "SELECT id, name, email, password_hash, role FROM users WHERE email = ?",
      [email]
    );

    if (!rows || rows.length === 0) {
      return res.status(401).json({
        status: false,
        message: "Invalid credential",
      });
    }

    const dataUser = rows[0];
    const isMatch = await bcrypt.compare(password, dataUser.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        status: false,
        message: "Invalid credential",
      });
    }

    const secretKey = process.env.JWT_SECRET || "default_super_secret_key";
    const token = jwt.sign(
      {
        id: dataUser.id,
        name: dataUser.name,
        email: dataUser.email,
        role: dataUser.role,
      },
      secretKey,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    return res.status(200).json({
      status: true,
      message: "Login Success",
      data: {
        user: {
          id: dataUser.id,
          name: dataUser.name,
          email: dataUser.email,
          role: dataUser.role,
        },
        token,
      },
    });
  } catch (error) {
    console.error("ERROR LOGIN:", error); // Tercetak jelas di terminal backend
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        status: false,
        message: "Name, email and password required",
      });
    }

    const [existingUser] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    
    if (existingUser && existingUser.length > 0) {
      return res.status(409).json({
        status: false,
        message: "Email already taken",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      `INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)`,
      [name.trim(), email.trim().toLowerCase(), passwordHash, role]
    );

    const [newUsers] = await pool.query(
      `SELECT id, name, email, role, created_at FROM users WHERE id = ?`,
      [result.insertId]
    );

    return res.status(201).json({
      status: true,
      message: "Register Success",
      data: {
        user: newUsers[0],
      },
    });
  } catch (error) {
    console.error("ERROR REGISTER:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};