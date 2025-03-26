import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app=express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.use(express.json());

import mainRouter from "./route/mainRouter.js";

app.use("/api/v1",mainRouter);


const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})