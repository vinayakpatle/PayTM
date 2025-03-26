import express from "express";
const accountRouter=express.Router();
import userMiddleware from '../middleware/userMiddleware.js';
import {transferBalance,getBalance} from "../controller/accountController.js";

accountRouter.get("/balance",userMiddleware,getBalance);
accountRouter.post("/transfer",userMiddleware,transferBalance);

export default accountRouter;