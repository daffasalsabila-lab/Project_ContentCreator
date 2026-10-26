import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../config/db.js";

const USERS = [
    {
        name: "admin",
        email: "admin@gmail.com",
        password: "12345678",
    },
];

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
            if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "Email and password required",
            });
        }
        
        const [user] = await pool.query("SELECT id, name, email, password_hash, role FROM users WHERE email= ?", [email]);
        if (user.length === 0) {
            return res.status(401).json({
                status: false,
                message: "Invalid crendential",
            });
        }

        const dataUser = user[0];
        const isMatch = await bcrypt.compare(password, dataUser.password_hash);
        if(!isMatch){
            // 401 : unauthorize = login gagal 
            return res.status(401).json({
                status: false,
                message: "Invalid crendential",
            });
        }

        // jangan di masukin password nya
        const token = jwt.sign({
            id: dataUser.id,
            name: dataUser.name,
            email: dataUser.email,
            }, 
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN || "1d"},
        ); 

        res.status(200).json({
            status: true,
            message: "Login Success",
            data: {
                user: {
                    id: dataUser.id,
                    name: dataUser.name,
                    email: dataUser.email,
                },
                token,
            }
        });


    } catch (error) {
        res.status(500).json({status: false, message: "Internal server error", error: error.message})
    }
};


export const register = async (req, res) => {
    // proses regis
    try {
        const { name, email, password } = req.body;
        // validasi input wajib
        if (!name || !email || !password) {
            return res.status(400).json({
                status: false,
                message: "Name, email anad password required",
            });
        }

        const [existingUser] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
        if (existingUser.length > 0) 
        {
            return res.status(409).json({
                status: false,
                message: "Email already taken"
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        //  Hash password sebelum disimpan
        const [result] = await pool.query(`INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)`, [name.trim(), email.trim().toLowerCase(), passwordHash]);
        //  simpan pengguna baru ke database
        const [newUsers] = await pool.query(`SELECT id, name, email, role, created_at FROM users WHERE id = ?`, [result.insertId]);
        // Ambil data pengguna yang baru dibuat

      return res.status(201).json({
        status: true,
        message: "Register Success",
        data: {
            user: newUsers[0],
        }
    });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

