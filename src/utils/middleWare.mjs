// wirte code for maddleWare for the user 
/**
 * the middle ware for make an operation for the data before handle the request like 
 * handle the request with another way and its async code next() function handle this
 * the code can be reuse for the all request in the code all specific request for the code 
 */

import infoUser from "./Const.mjs";

export const handleFindUser = (request, response, next) => {
    const {
        params: { id }
    } = request;
    const userId = parseInt(id);
    if (isNaN(userId)) return response.sendStatus(400).send("not valid id user");
    const findUser = infoUser.findIndex((user) => user.id === userId)
    if (findUser === -1) return response.sendStatus(400).send("error no user found")
    request.findIndexUser = findUser;
    next();
}