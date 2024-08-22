const factoryService = require("../services/factory.service");
const { logger, responser, upload } = require("common-function-api")

module.exports.createFactory = async (req, res) => {
    logger.info(`Creating Factory Controllers`);
    const reqData = req.body;
    const type = req.body.collectionName

    if (reqData.mainPicture) {
        const singlePicture = await upload.uploadOnCloudinary(reqData.mainPicture, "Factory")
        reqData.mainPicture = singlePicture.secure_url
    }

    if (Array.isArray(reqData.arrayImages)) {
        const multiPictures = await upload.uploadArrayImage(reqData.arrayImages, "Factory");

        // Map the response to the desired format
        reqData.arrayImages = multiPictures.map(picture => {
            const secureUrl = picture.cloudinaryResponse?.secure_url;
            return secureUrl ? { img: secureUrl } : null;
        }).filter(obj => obj !== null);  // Filter out any null values

        // Handle cases where not all images may have been uploaded successfully
        if (reqData.arrayImages.length === 0) {
            return responser.send(400, "Failed to upload any images", req, res);
        }
    }
    const data = await factoryService.createFactory(type, reqData);
    logger.data("data", data);
    return responser.send(200, `Creating ${type} Record...`, req, res, data)
}

module.exports.getAllFactories = async (req, res) => {
    logger.info(`Get All Factory Controllers`);
    const reqData = req.body;
    const type = req.body.collectionName
    const data = await factoryService.getAllFactories(type, reqData)
    logger.data("data", data);
    return responser.send(200, `Get All ${type} Record...`, req, res, data)
}

module.exports.getOneFactory = async (req, res) => {
    logger.info(`Get One Factory Controllers`);
    const reqData = req.body;
    const type = req.body.collectionName
    const condition = {
        _id: reqData.id
    }
    const data = await factoryService.getOneFactory(type, condition)
    logger.data("data", data);
    return responser.send(200, `Get One ${type} Record...`, req, res, data)
}

module.exports.updateFactory = async (req, res) => {
    logger.info(`Update Factory Controllers`);
    const reqData = req.body;
    const params = req.params;
    const type = req.body.collectionName
    const condition = {
        _id: params.id
    }
    const data = await factoryService.updateFactory(type, condition, reqData)
    logger.data("data", data);
    return responser.send(200, `Updated ${type} Record...`, req, res, data)
}

module.exports.deleteFactory = async (req, res) => {
    logger.info(`delete Factory Controllers`);
    const type = req.body.collectionName
    const params = req.params;
    const condition = {
        _id: params.id
    }
    const data = await factoryService.deleteFactory(type, condition)
    logger.data("data", data);
    return responser.send(200, `Deleted ${type} Record...`, req, res, data)
}

module.exports.getAllFactoriesWithPaginations = async (req, res) => {
    logger.info(`Get All Factory Controllers`);
    const query = req.query
    const type = req.query.collectionName
    const data = await factoryService.getAllFactoriesWithPaginations(type, query)
    logger.data("data", data);
    return responser.send(200, `Get All Paginations ${type} Record...`, req, res, data)
}