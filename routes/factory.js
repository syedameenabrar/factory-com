const { Router } = require("express")
const factoryController = require("../controllers/factory.controller");
const factoryRouter = Router();
// const { catchError } = require("database-connection-function-com")
const { catchError } = require("../utils/catchError")
const jwtVerify = require("auth-curd-api2-otp")

factoryRouter.route("/create")
    .post(jwtVerify.authorized.verifyJWT, catchError(factoryController.createFactory))

factoryRouter.route("/getAll")
    .post(jwtVerify.authorized.verifyJWT, catchError(factoryController.getAllFactories))

factoryRouter.route("/getOne")
    .post(jwtVerify.authorized.verifyJWT, catchError(factoryController.getOneFactory))

factoryRouter.route("/getAllPublic")
    .post(catchError(factoryController.getAllFactories))

factoryRouter.route("/getOnePublic")
    .post(catchError(factoryController.getOneFactory))

factoryRouter.route("/update/:id")
    .patch(jwtVerify.authorized.verifyJWT, catchError(factoryController.updateFactory))

factoryRouter.route("/delete/:id")
    .delete(jwtVerify.authorized.verifyJWT, catchError(factoryController.deleteFactory))

factoryRouter.route("/pagination")
    .get(catchError(factoryController.getAllFactoriesWithPaginations))

module.exports = factoryRouter