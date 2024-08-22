const factoryRouter = require("./factory");

const routes = (app) => {
    app.use("/factory", factoryRouter)
}

module.exports = routes;