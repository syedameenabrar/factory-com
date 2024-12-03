const factoryService = require("../services/factory.service");
const { logger, responser, upload } = require("database-connection-function-com")

module.exports.createFactory = async (req, res) => {
    logger.info("Creating Factory Controllers");
    const reqData = req.body;
    const type = req.body.collectionName

    if (reqData.mainPicture) {
        const singlePicture = await upload.uploadOnCloudinary(reqData.mainPicture, "Factory")
        reqData.mainPicture = singlePicture.secure_url
    }

  
    // if (Array.isArray(reqData.arrayImages)) {
    //     const multiPictures = await upload.uploadArrayImage(reqData.arrayImages, "Factory");

    //     // Map the response to the desired format
    //     reqData.arrayImages = multiPictures.map(picture => {
    //         const secureUrl = picture.cloudinaryResponse?.secure_url;
    //         return secureUrl ? { img: secureUrl } : null;
    //     }).filter(obj => obj !== null);  // Filter out any null values

    //     // Handle cases where not all images may have been uploaded successfully
    //     if (reqData.arrayImages.length === 0) {
    //         return responser.send(400, "Failed to upload any images", req, res);
    //     }
    // }

    // Utility function to handle array image uploads
    const uploadImages = async (images, folder) => {
        const multiPictures = await upload.uploadArrayImage(images, folder);
        return multiPictures
            .map(picture => picture.cloudinaryResponse?.secure_url ? { img: picture.cloudinaryResponse.secure_url } : null)
            .filter(Boolean);
    };

    // Upload array images if present
    if (Array.isArray(reqData.arrayImages)) {
        reqData.arrayImages = await uploadImages(reqData.arrayImages, "arrayImages");
        if (!reqData.arrayImages.length) {
            return responser.send(400, "Failed to upload array images", req, res);
        }
    }

    // Upload vahical images if present
    if (Array.isArray(reqData.vehiclePictures)) {
        reqData.vehiclePictures = await uploadImages(reqData.vehiclePictures, "vehiclePictures");
        if (!reqData.vehiclePictures.length) {
            return responser.send(400, "Failed to upload vahical images", req, res);
        }
    }

    // Upload vahical images if present
    if (Array.isArray(reqData.chasisPictures)) {
        reqData.chasisPictures = await uploadImages(reqData.chasisPictures, "chasisPictures");
        if (!reqData.chasisPictures.length) {
            return responser.send(400, "Failed to upload chasis picture images", req, res);
        }
    }


    // Upload vahical images if present
    if (Array.isArray(reqData.enginePictures)) {
        reqData.enginePictures = await uploadImages(reqData.enginePictures, "enginePictures");
        if (!reqData.enginePictures.length) {
            return responser.send(400, "Failed to upload engine picture images", req, res);
        }
    }

    // Upload vahical images if present
    if (Array.isArray(reqData.scrapLetterPictures)) {
        reqData.scrapLetterPictures = await uploadImages(reqData.scrapLetterPictures, "scrapLetterPictures");
        if (!reqData.scrapLetterPictures.length) {
            return responser.send(400, "Failed to upload scrap letter images", req, res);
        }
    }

    // Upload vahical images if present
    if (Array.isArray(reqData.userDocumentsPictures)) {
        reqData.userDocumentsPictures = await uploadImages(reqData.userDocumentsPictures, "userDocumentsPictures");
        if (!reqData.userDocumentsPictures.length) {
            return responser.send(400, "Failed to upload user document images", req, res);
        }
    }
    // Upload rcPictures images if present
    if (Array.isArray(reqData.rcPictures)) {
        reqData.rcPictures = await uploadImages(reqData.rcPictures, "rcPictures");
        if (!reqData.rcPictures.length) {
            return responser.send(400, "Failed to upload rcPictures images", req, res);
        }
    }
    // Upload towingPictures images if present
    if (Array.isArray(reqData.towingPictures)) {
        reqData.towingPictures = await uploadImages(reqData.towingPictures, "towingPictures");
        if (!reqData.towingPictures.length) {
            return responser.send(400, "Failed to upload towingPictures images", req, res);
        }
    }
    // Upload scrapPictures images if present
    if (Array.isArray(reqData.scrapPictures)) {
        reqData.scrapPictures = await uploadImages(reqData.scrapPictures, "scrapPictures");
        if (!reqData.scrapPictures.length) {
            return responser.send(400, "Failed to upload scrapPictures images", req, res);
        }
    }

    // chasisPictures, rcPictures, vehiclePictures, enginePictures, scrapLetterPictures, userDocumentsPictures

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

    if (Array.isArray(reqData.chasisPictures)) {
        const multiPictures = await upload.uploadArrayImage(reqData.chasisPictures, "chasisPictures");

        // Map the response to the desired format
        reqData.chasisPictures = multiPictures.map(picture => {
            const secureUrl = picture.cloudinaryResponse?.secure_url;
            return secureUrl ? { img: secureUrl } : null;
        }).filter(obj => obj !== null);  // Filter out any null values
    }


    
    
    
    
    
    if (Array.isArray(reqData.arrayImages)) {
        const multiPictures = await upload.uploadArrayImage(reqData.arrayImages, "arrayImages");

        // Map the response to the desired format
        reqData.arrayImages = multiPictures.map(picture => {
            const secureUrl = picture.cloudinaryResponse?.secure_url;
            return secureUrl ? { img: secureUrl } : null;
        }).filter(obj => obj !== null);  // Filter out any null values
    }
    if (Array.isArray(reqData.vehiclePictures)) {
        const multiPictures = await upload.uploadArrayImage(reqData.vehiclePictures, "vehiclePictures");

        // Map the response to the desired format
        reqData.vehiclePictures = multiPictures.map(picture => {
            const secureUrl = picture.cloudinaryResponse?.secure_url;
            return secureUrl ? { img: secureUrl } : null;
        }).filter(obj => obj !== null);  // Filter out any null values
    }
    if (Array.isArray(reqData.enginePictures)) {
        const multiPictures = await upload.uploadArrayImage(reqData.enginePictures, "enginePictures");

        // Map the response to the desired format
        reqData.enginePictures = multiPictures.map(picture => {
            const secureUrl = picture.cloudinaryResponse?.secure_url;
            return secureUrl ? { img: secureUrl } : null;
        }).filter(obj => obj !== null);  // Filter out any null values
    }
    if (Array.isArray(reqData.userDocumentsPictures)) {
        const multiPictures = await upload.uploadArrayImage(reqData.userDocumentsPictures, "userDocumentsPictures");

        // Map the response to the desired format
        reqData.userDocumentsPictures = multiPictures.map(picture => {
            const secureUrl = picture.cloudinaryResponse?.secure_url;
            return secureUrl ? { img: secureUrl } : null;
        }).filter(obj => obj !== null);  // Filter out any null values
    }
    if (Array.isArray(reqData.scrapLetterPictures)) {
        const multiPictures = await upload.uploadArrayImage(reqData.scrapLetterPictures, "scrapLetterPictures");

        // Map the response to the desired format
        reqData.scrapLetterPictures = multiPictures.map(picture => {
            const secureUrl = picture.cloudinaryResponse?.secure_url;
            return secureUrl ? { img: secureUrl } : null;
        }).filter(obj => obj !== null);  // Filter out any null values
    }
    if (Array.isArray(reqData.rcPictures)) {
        const multiPictures = await upload.uploadArrayImage(reqData.rcPictures, "rcPictures");

        // Map the response to the desired format
        reqData.rcPictures = multiPictures.map(picture => {
            const secureUrl = picture.cloudinaryResponse?.secure_url;
            return secureUrl ? { img: secureUrl } : null;
        }).filter(obj => obj !== null);  // Filter out any null values
    }
    if (Array.isArray(reqData.towingPictures)) {
        const multiPictures = await upload.uploadArrayImage(reqData.towingPictures, "towingPictures");

        // Map the response to the desired format
        reqData.towingPictures = multiPictures.map(picture => {
            const secureUrl = picture.cloudinaryResponse?.secure_url;
            return secureUrl ? { img: secureUrl } : null;
        }).filter(obj => obj !== null);  // Filter out any null values
    }
    if (Array.isArray(reqData.scrapPictures)) {
        const multiPictures = await upload.uploadArrayImage(reqData.scrapPictures, "scrapPictures");

        // Map the response to the desired format
        reqData.scrapPictures = multiPictures.map(picture => {
            const secureUrl = picture.cloudinaryResponse?.secure_url;
            return secureUrl ? { img: secureUrl } : null;
        }).filter(obj => obj !== null);  // Filter out any null values
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
