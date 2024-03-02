import { Router } from "express";


const productRouter = Router();


productRouter.get("/api/product", (request, response) => {
    response.status(200).send({ name: "chicken", price: 20, type: "meat" })
})



export default productRouter;