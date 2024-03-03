import { Router } from "express";


const productRouter = Router();


productRouter.get("/api/product", (request, response) => {
    if (request.cookies.name == null && request.signedCookies.name == null)
        return response.status(401).send("you are not authorized to see this page")
    console.log(request.cookies);
    console.log(request.headers.cookies)
    console.log(request.signedCookies.name);
    response.status(200).send({ name: "chicken", price: 20, type: "meat" })
})



export default productRouter;