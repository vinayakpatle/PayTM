import express from 'express';
import {signup,signin,signout,updateUser,searchUser,refresh} from "../controller/userController.js";
import userMiddleware from "../middleware/userMiddleware.js";
const userRouter=express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.get("/signout", signout);
userRouter.put("/update", userMiddleware, updateUser);
userRouter.get("/bulk", userMiddleware, searchUser);
userRouter.get("/me",userMiddleware,refresh);


export default userRouter;