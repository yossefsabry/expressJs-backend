import { Router } from "express";
import userRouter from "./user.mjs";
import productRouter from "./product.mjs";

const routers = Router();

routers.use(userRouter);
routers.use(productRouter);


export default routers;