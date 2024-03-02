import express from "express";
import userRouter from "./routes/user.mjs";
import productRouter from "./routes/product.mjs";

//start the app     
const app = express();

// this line is very important because if you dont do it its will not return and json 
// object for any request so cant make any request like post and patch and put
app.use(express.json());
app.use(userRouter);
app.use(productRouter);

const PORT = process.env.PORT || 3000


app.get("/", (request, response) => {
    response.status(200).send({ msg: "welcome in our plog " })
})

app.listen(PORT, () => {
    console.log("listen to app in port", PORT)
});


