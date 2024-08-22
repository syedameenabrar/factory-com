const { Router } = require("express")
const factoryController = require("../controllers/factory.controller");
const factoryRouter = Router();
// const { catchError } = require("common-function-api")
const { catchError } = require("../utils/catchError")
const jwtVerify = require("auth-curd-api")

factoryRouter.route("/create")
    .post(jwtVerify.authorized.verifyJWT, catchError(factoryController.createFactory))

factoryRouter.route("/getAll")
    .post(catchError(factoryController.getAllFactories))

factoryRouter.route("/getOne")
    .post(catchError(factoryController.getOneFactory))

factoryRouter.route("/update/:id")
    .patch(jwtVerify.authorized.verifyJWT, catchError(factoryController.updateFactory))

factoryRouter.route("/delete/:id")
    .delete(jwtVerify.authorized.verifyJWT, catchError(factoryController.deleteFactory))

factoryRouter.route("/pagination")
    .get(catchError(factoryController.getAllFactoriesWithPaginations))

module.exports = factoryRouter