import express from "express";
// import { Router } from "express";
import { register, login } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);


export default router;


// import { Router } from "express";    
// import { login } from "../controllers/AuthController.js";

// const router = Router();

// router.post('/login, login');


// export default router;
