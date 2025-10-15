import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({origin:"http://localhost:5173", credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (_req,res) => {
    res.json({ok:true});
});

export default app;