import { Router } from "express";
import { validationResult, matchedData, checkSchema, body } from "express-validator";
import { handleValidation } from "../utils/handleValidation.mjs";
import { handleFindUser } from "../utils/middleWare.mjs";
import infoUser from "../utils/Const.mjs"

const userRouter = Router();

userRouter.get("/api/user", (request, response) => {
    response.send(infoUser)
})

userRouter.get("/api/user/:id", (request, response) => {
    let paramsUser = parseInt(request.params.id);
    if (isNaN(paramsUser)) {
        return response.status(400).send("error in input user");
    }
    const findUser = infoUser.find((user) => user.id === paramsUser);
    if (!findUser) return response.sendStatus(404)
    return response.send(findUser);
})

// handle check create post request from user 
/**
 *  the put update all the data inssider the user for mean 
 * so this mean if i have i user = {name: "yosef", age: 20} and in the put body a adding 
 * only name for the user then the age gone be none and in monenge db and some 
 * the null value remvoe and its key this its not exits
 * for this put most adding all the info about the user again 
 * but patch not doing this this  the main difference between put and patch
 */
userRouter.post("/api/user", body("username")
    .notEmpty().withMessage("username is requeired")
    .isLength({ min: 3, max: 30 }).withMessage("usernamemust be between 3 and 30 characher")
    .isString().withMessage("username must be string")
    , (request, response) => {
        request.sessionStore.get(request.session.id, (err, sessions) => {
            if(err) {
                console.log(err);
                throw err;
            }
            console.log(sessions);
        })
        const results = validationResult(request);
        console.log(results.array());
        if (!results.isEmpty()) {
            return response.status(400).send({ errors: results.array() })
        }
        const data = matchedData(request);
        console.log(data);
        // let newUser = { id: infoUser[-1].id + 1, ...body};
        let newUser = { id: infoUser[infoUser.length - 1].id + 1, ...data };
        infoUser.push(newUser);
        return response.sendStatus(201);
    })

/**
 * second way to handle the validation for the post request
 * by using the checkSchema and handleValidation
 * its more using because its more clean and more readable
 * and split the code to many file and its more easy to maintain
 */
userRouter.put("/api/user/:id", checkSchema(handleValidation), handleFindUser, (request, response) => {
    const results = validationResult(request);
    console.log(results.array())
    if (!results.isEmpty()) {
        return response.status(400).send({ errors: results.array() })
    }
    const { body, findIndexUser } = request;
    infoUser[findIndexUser] = { id: infoUser[findIndexUser].id, ...body };
    return response.sendStatus(200)
})

// for update  value or values for current user
userRouter.patch("/api/user/:id", handleFindUser, (request, response) => {
    const { body, findIndexUser } = request;
    infoUser[findIndexUser] = { ...infoUser[findIndexUser], ...body }
    return response.sendStatus(200)
})

userRouter.delete("/api/user/:id", handleFindUser, (request, response) => {
    const {
        findIndexUser
    } = request;
    infoUser.splice(findIndexUser, 1);
    return response.sendStatus(200);
})


export default userRouter;

