import express from "express";
import routers from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import infoUser from "./utils/Const.mjs";
import { body,  matchedData, validationResult } from "express-validator";

//start the app     
const app = express();

// this line is very important because if you dont do it its will not return and json 
// object for any request so cant make any request like post and patch and put
app.use(express.json());
app.use(cookieParser("welcome"));
app.use(session({
    secret: "yossef",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60
    }
}))
app.use(routers);

const PORT = process.env.PORT || 3000


app.get("/", (request, response) => {
    // console.log(request.session)
    console.log(request.session.id)
    request.session.visited = true;
    response.cookie("name", "yosef", { maxAge: 1000 * 60 * 60 * 24 * 7, signed: true });
    response.status(200).send({ msg: "welcome in our plog " })
})

app.post("/api/auth", body("username")
    .notEmpty().withMessage("the username is empty not valid")
    .isString({ maxAge: { min: 3, max: 30 } })
    .withMessage("not valid username its must be between 3 and 30 characther"),
    body("password").notEmpty().withMessage("the password is empty not valid")
    , (request, response) => {
        const resutls = validationResult(request)
        console.log(resutls);
        const { body: { username, password } } = request;

        if (!resutls.isEmpty()) return response.status(400).send({ erorr: "error in username or password" });
        const findUser = infoUser.find((user) => user.username === username && user.password === password);
        if (!findUser) return response.status(401).send("error in username or password");

        request.session.user = findUser;
        // restore the data from post request in data
        const data = matchedData(request);
        console.log(data)
        response.status(200).send({ msg: "welcome in our app", findUser });
    })

app.get("/api/auth/status", (request, response) => {
    if (!request.session.user) return response.status(401).send("you are not login");
    response.status(200).send({ msg: "you are login", user: request.session.user })
})




app.listen(PORT, () => {
    console.log("listen to app in port", PORT)
});


