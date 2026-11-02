import jwt from "jsonwebtoken"

export const verifyToken = (req,res,next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            status: false,
            message: "Unauthorized"
        });
    }
    const token = authHeader.split(" ")[1];

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).json ({
            status: false,
            message: "Token is invalid or has expired",
        });
    }
};