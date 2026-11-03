import express from "express";
import cors from "cors";

const app = express();
// app.use(
//   cors({
//     allowedHeaders: ["POST", "GET", "PUT", "OPTION", "PATCH"],
//     origin: undefined,
//     methods: ["*"],
//     credentials: false,
//     preflightContinue: false,
//   }),
// );
app.use(
  cors({
    origin: true,
  }),
);

app.use(express.json());

export default app;
