const factoryService = require("../services/factory.service");
const { logger, AppError, responser, upload } = require("database-connection-function-com")
module.exports.createFactory = async (req, res) => {
    logger.info("Creating Factory Controllers");
    const reqData = req.body;
    const type = req.body.collectionName

    if (reqData?.mainPicture) {
        const singlePicture = await upload.uploadOnCloudinary(reqData?.mainPicture, "Factory")
        reqData.mainPicture = singlePicture?.secure_url
    }


    // if (Array.isArray(reqData?.arrayImages)) {
    //     const multiPictures = await upload.uploadArrayImage(reqData?.arrayImages, "Factory");

    //     // Map the response to the desired format
    //     reqData?.arrayImages = multiPictures.map(picture => {
    //         const secureUrl = picture?.cloudinaryResponse?.secure_url;
    //         return secureUrl ? { img: secureUrl } : null;
    //     }).filter(obj => obj !== null);  // Filter out any null values

    //     // Handle cases where not all images may have been uploaded successfully
    //     if (reqData?.arrayImages.length === 0) {
    //         return responser.send(400, "Failed to upload any images", req, res);
    //     }
    // }

    // Utility function to handle array image uploads
    const uploadImages = async (images, folder) => {
        const multiPictures = await upload.uploadArrayImage(images, folder);
        return multiPictures
            .map(picture => picture?.cloudinaryResponse?.secure_url ? { img: picture?.cloudinaryResponse?.secure_url } : null)
            .filter(Boolean);
    };

    // Upload array images if present
    if (Array.isArray(reqData?.arrayImages) && reqData.arrayImages.length > 0) {
        reqData.arrayImages = await uploadImages(reqData.arrayImages, "arrayImages");
        if (reqData.arrayImages.length === 0) {
            throw new AppError(400, "Failed to upload array images");
        }
    }

    // Upload vahical images if present
    if (Array.isArray(reqData?.vehiclePictures) && reqData.vehiclePictures.length > 0) {
        reqData.vehiclePictures = await uploadImages(reqData?.vehiclePictures, "vehiclePictures");
        // if (!reqData?.vehiclePictures.length) {
        if (reqData?.vehiclePictures.length === 0) {

            throw new AppError(400, "Failed to vehiclePictures images");

        }
    }

    // Upload vahical images if present
    if (Array.isArray(reqData?.chasisPictures) && reqData.chasisPictures.length > 0) {
        reqData.chasisPictures = await uploadImages(reqData?.chasisPictures, "chasisPictures");
        // if (!reqData?.chasisPictures.length) {
        if (reqData?.chasisPictures.length === 0) {
            throw new AppError(400, "Failed to chasisPictures images");

        }
    }


    // Upload vahical images if present
    if (Array.isArray(reqData?.enginePictures) && reqData.enginePictures.length > 0) {
        reqData.enginePictures = await uploadImages(reqData?.enginePictures, "enginePictures");
        // if (!reqData?.enginePictures.length) {
        if (reqData?.enginePictures.length === 0) {
            throw new AppError(400, "Failed to enginePictures images");

        }
    }

    // Upload vahical images if present
    if (Array.isArray(reqData?.scrapLetterPictures) && reqData.scrapLetterPictures.length > 0) {
        reqData.scrapLetterPictures = await uploadImages(reqData?.scrapLetterPictures, "scrapLetterPictures");
        // if (!reqData?.scrapLetterPictures.length) {
        if (reqData?.scrapLetterPictures.length === 0) {
            throw new AppError(400, "Failed to scrapLetterPictures images");

        }
    }

    // Upload vahical images if present
    if (Array.isArray(reqData?.userDocumentsPictures) && reqData.userDocumentsPictures.length > 0) {
        reqData.userDocumentsPictures = await uploadImages(reqData?.userDocumentsPictures, "userDocumentsPictures");
        // if (!reqData?.userDocumentsPictures.length) {
        if (reqData?.userDocumentsPictures.length === 0) {
            throw new AppError(400, "Failed to userDocumentsPictures images");

        }
    }
    // Upload rcPictures images if present
    if (Array.isArray(reqData?.rcPictures) && reqData.rcPictures.length > 0) {
        reqData.rcPictures = await uploadImages(reqData?.rcPictures, "rcPictures");
        // if (!reqData?.rcPictures.length) {
        if (reqData?.rcPictures.length === 0) {
            throw new AppError(400, "Failed to rcPictures images");

        }
    }
    // Upload towingPictures images if present
    if (Array.isArray(reqData?.towingPictures) && reqData.towingPictures.length > 0) {
        reqData.towingPictures = await uploadImages(reqData?.towingPictures, "towingPictures");
        // if (!reqData?.towingPictures.length) {
        if (reqData?.towingPictures.length === 0) {
            throw new AppError(400, "Failed to towingPictures images");

        }
    }
    // Upload scrapPictures images if present
    if (Array.isArray(reqData?.scrapPictures) && reqData.scrapPictures.length > 0) {
        reqData.scrapPictures = await uploadImages(reqData?.scrapPictures, "scrapPictures");
        // if (!reqData?.scrapPictures.length) {
        if (reqData?.scrapPictures.length === 0) {
            throw new AppError(400, "Failed to scrapPictures images");

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
        _id: reqData?.id
    }
    const data = await factoryService.getOneFactory(type, condition)
    logger.data("data", data);
    return responser.send(200, `Get One ${type} Record...`, req, res, data)
}

// module.exports.updateFactory = async (req, res) => {
//     logger.info(`Update Factory Controllers`);
//     const reqData = req.body;
//     const params = req.params;
//     const type = req.body.collectionName
//     const condition = {
//         _id: params.id
//     }

//     if (Array.isArray(reqData?.chasisPictures)) {
//         const multiPictures = await upload.uploadArrayImage(reqData?.chasisPictures, "chasisPictures");

//         // Map the response to the desired format
//         reqData.chasisPictures = multiPictures.map(picture => {
//             const secureUrl = picture?.cloudinaryResponse?.secure_url;
//             return secureUrl ? { img: secureUrl } : null;
//         }).filter(obj => obj !== null);  // Filter out any null values
//     }

//     if (reqData?.mainPicture) {
//         const singlePicture = await upload.uploadOnCloudinary(reqData?.mainPicture, "Factory")
//         reqData.mainPicture = singlePicture?.secure_url
//     }



//     if (Array.isArray(reqData?.arrayImages)) {
//         const multiPictures = await upload.uploadArrayImage(reqData?.arrayImages, "arrayImages");

//         // Map the response to the desired format
//         reqData.arrayImages = multiPictures.map(picture => {
//             const secureUrl = picture?.cloudinaryResponse?.secure_url;
//             return secureUrl ? { img: secureUrl } : null;
//         }).filter(obj => obj !== null);  // Filter out any null values
//     }
//     if (Array.isArray(reqData?.vehiclePictures)) {
//         const multiPictures = await upload.uploadArrayImage(reqData?.vehiclePictures, "vehiclePictures");

//         // Map the response to the desired format
//         reqData.vehiclePictures = multiPictures.map(picture => {
//             const secureUrl = picture?.cloudinaryResponse?.secure_url;
//             return secureUrl ? { img: secureUrl } : null;
//         }).filter(obj => obj !== null);  // Filter out any null values
//     }
//     if (Array.isArray(reqData?.enginePictures)) {
//         const multiPictures = await upload.uploadArrayImage(reqData?.enginePictures, "enginePictures");

//         // Map the response to the desired format
//         reqData.enginePictures = multiPictures.map(picture => {
//             const secureUrl = picture?.cloudinaryResponse?.secure_url;
//             return secureUrl ? { img: secureUrl } : null;
//         }).filter(obj => obj !== null);  // Filter out any null values
//     }
//     if (Array.isArray(reqData?.userDocumentsPictures)) {
//         const multiPictures = await upload.uploadArrayImage(reqData?.userDocumentsPictures, "userDocumentsPictures");

//         // Map the response to the desired format
//         reqData.userDocumentsPictures = multiPictures.map(picture => {
//             const secureUrl = picture?.cloudinaryResponse?.secure_url;
//             return secureUrl ? { img: secureUrl } : null;
//         }).filter(obj => obj !== null);  // Filter out any null values
//     }
//     if (Array.isArray(reqData?.scrapLetterPictures)) {
//         const multiPictures = await upload.uploadArrayImage(reqData?.scrapLetterPictures, "scrapLetterPictures");

//         // Map the response to the desired format
//         reqData.scrapLetterPictures = multiPictures.map(picture => {
//             const secureUrl = picture?.cloudinaryResponse?.secure_url;
//             return secureUrl ? { img: secureUrl } : null;
//         }).filter(obj => obj !== null);  // Filter out any null values
//     }
//     if (Array.isArray(reqData?.rcPictures)) {
//         const multiPictures = await upload.uploadArrayImage(reqData?.rcPictures, "rcPictures");

//         // Map the response to the desired format
//         reqData.rcPictures = multiPictures.map(picture => {
//             const secureUrl = picture?.cloudinaryResponse?.secure_url;
//             return secureUrl ? { img: secureUrl } : null;
//         }).filter(obj => obj !== null);  // Filter out any null values
//     }
//     if (Array.isArray(reqData?.towingPictures)) {
//         const multiPictures = await upload.uploadArrayImage(reqData?.towingPictures, "towingPictures");

//         // Map the response to the desired format
//         reqData.towingPictures = multiPictures.map(picture => {
//             const secureUrl = picture?.cloudinaryResponse?.secure_url;
//             return secureUrl ? { img: secureUrl } : null;
//         }).filter(obj => obj !== null);  // Filter out any null values
//     }
//     if (Array.isArray(reqData?.scrapPictures)) {
//         const multiPictures = await upload.uploadArrayImage(reqData?.scrapPictures, "scrapPictures");

//         // Map the response to the desired format
//         reqData.scrapPictures = multiPictures.map(picture => {
//             const secureUrl = picture?.cloudinaryResponse?.secure_url;
//             return secureUrl ? { img: secureUrl } : null;
//         }).filter(obj => obj !== null);  // Filter out any null values
//     }

//     const data = await factoryService.updateFactory(type, condition, reqData)
//     logger.data("data", data);
//     return responser.send(200, `Updated ${type} Record...`, req, res, data)
// }

module.exports.updateFactory = async (req, res) => {
    logger.info(`Update Factory Controller`);
    const reqData = req.body;
    const params = req.params;
    const type = reqData.collectionName; // Ensure collectionName is part of the request body
    const condition = {
        _id: params.id, // Assuming `id` is passed in the request parameters
    };

    let updateData = {};

    // Dynamically add fields to updateData
    Object.keys(reqData).forEach((key) => {
        if (key !== "collectionName" && key !== "id") {
            updateData[key] = reqData[key];
        }
    });

    if (Array.isArray(reqData.vehiclePictures)) {
        let promises = [];

        for (let obj of reqData.vehiclePictures) {
            let imageLocation;

            // Check if the image is already a URL
            if (obj.img.startsWith("https://") || obj.img.startsWith("http://")) {
                imageLocation = obj.img; // Keep the existing URL
                promises.push({ img: imageLocation }); // Add to promises array
            } else {
                // Upload the base64 images and handle the response
                const uploadedImages = await upload.uploadArrayImage(
                    reqData.vehiclePictures,
                    "vehiclePictures"
                );

                // Map over uploadedImages array to extract the secure_url
                const formattedPictures = uploadedImages
                    .map((uploadedImage) => {
                        const secureUrl = uploadedImage?.cloudinaryResponse?.secure_url;
                        return secureUrl ? { img: secureUrl } : null; // Ensure valid URLs
                    })
                    .filter((item) => item !== null); // Remove null values

                promises = promises.concat(formattedPictures); // Append formatted pictures
                break; // Exit loop after processing array
            }
        }

        // Update the vehiclePictures field in updateData
        updateData.vehiclePictures = promises;
    }

    if (Array.isArray(reqData.chasisPictures)) {
        let promises = [];

        for (let obj of reqData.chasisPictures) {
            let imageLocation;

            // Check if the image is already a URL
            if (obj.img.startsWith("https://") || obj.img.startsWith("http://")) {
                imageLocation = obj.img; // Keep the existing URL
                promises.push({ img: imageLocation }); // Add to promises array
            } else {
                // Upload the base64 images and handle the response
                const uploadedImages = await upload.uploadArrayImage(
                    reqData.chasisPictures,
                    "chasisPictures"
                );

                // Map over uploadedImages array to extract the secure_url
                const formattedPictures = uploadedImages
                    .map((uploadedImage) => {
                        const secureUrl = uploadedImage?.cloudinaryResponse?.secure_url;
                        return secureUrl ? { img: secureUrl } : null; // Ensure valid URLs
                    })
                    .filter((item) => item !== null); // Remove null values

                promises = promises.concat(formattedPictures); // Append formatted pictures
                break; // Exit loop after processing array
            }
        }

        // Update the vehiclePictures field in updateData
        updateData.chasisPictures = promises;
    }

    if (Array.isArray(reqData.scrapPictures)) {
        let promises = [];

        for (let obj of reqData.scrapPictures) {
            let imageLocation;

            // Check if the image is already a URL
            if (obj.img.startsWith("https://") || obj.img.startsWith("http://")) {
                imageLocation = obj.img; // Keep the existing URL
                promises.push({ img: imageLocation }); // Add to promises array
            } else {
                // Upload the base64 images and handle the response
                const uploadedImages = await upload.uploadArrayImage(
                    reqData.scrapPictures,
                    "scrapPictures"
                );

                // Map over uploadedImages array to extract the secure_url
                const formattedPictures = uploadedImages
                    .map((uploadedImage) => {
                        const secureUrl = uploadedImage?.cloudinaryResponse?.secure_url;
                        return secureUrl ? { img: secureUrl } : null; // Ensure valid URLs
                    })
                    .filter((item) => item !== null); // Remove null values

                promises = promises.concat(formattedPictures); // Append formatted pictures
                break; // Exit loop after processing array
            }
        }

        // Update the vehiclePictures field in updateData
        updateData.scrapPictures = promises;
    }
    // towingPictures
    if (Array.isArray(reqData.towingPictures)) {
        let promises = [];

        for (let obj of reqData.towingPictures) {
            let imageLocation;

            // Check if the image is already a URL
            if (obj.img.startsWith("https://") || obj.img.startsWith("http://")) {
                imageLocation = obj.img; // Keep the existing URL
                promises.push({ img: imageLocation }); // Add to promises array
            } else {
                // Upload the base64 images and handle the response
                const uploadedImages = await upload.uploadArrayImage(
                    reqData.towingPictures,
                    "towingPictures"
                );

                // Map over uploadedImages array to extract the secure_url
                const formattedPictures = uploadedImages
                    .map((uploadedImage) => {
                        const secureUrl = uploadedImage?.cloudinaryResponse?.secure_url;
                        return secureUrl ? { img: secureUrl } : null; // Ensure valid URLs
                    })
                    .filter((item) => item !== null); // Remove null values

                promises = promises.concat(formattedPictures); // Append formatted pictures
                break; // Exit loop after processing array
            }
        }

        // Update the vehiclePictures field in updateData
        updateData.towingPictures = promises;
    }
    // rcPictures
    if (Array.isArray(reqData.rcPictures)) {
        let promises = [];

        for (let obj of reqData.rcPictures) {
            let imageLocation;

            // Check if the image is already a URL
            if (obj.img.startsWith("https://") || obj.img.startsWith("http://")) {
                imageLocation = obj.img; // Keep the existing URL
                promises.push({ img: imageLocation }); // Add to promises array
            } else {
                // Upload the base64 images and handle the response
                const uploadedImages = await upload.uploadArrayImage(
                    reqData.rcPictures,
                    "rcPictures"
                );

                // Map over uploadedImages array to extract the secure_url
                const formattedPictures = uploadedImages
                    .map((uploadedImage) => {
                        const secureUrl = uploadedImage?.cloudinaryResponse?.secure_url;
                        return secureUrl ? { img: secureUrl } : null; // Ensure valid URLs
                    })
                    .filter((item) => item !== null); // Remove null values

                promises = promises.concat(formattedPictures); // Append formatted pictures
                break; // Exit loop after processing array
            }
        }

        // Update the vehiclePictures field in updateData
        updateData.rcPictures = promises;
    }
    // scrapLetterPictures
    if (Array.isArray(reqData.scrapLetterPictures)) {
        let promises = [];

        for (let obj of reqData.scrapLetterPictures) {
            let imageLocation;

            // Check if the image is already a URL
            if (obj.img.startsWith("https://") || obj.img.startsWith("http://")) {
                imageLocation = obj.img; // Keep the existing URL
                promises.push({ img: imageLocation }); // Add to promises array
            } else {
                // Upload the base64 images and handle the response
                const uploadedImages = await upload.uploadArrayImage(
                    reqData.scrapLetterPictures,
                    "scrapLetterPictures"
                );

                // Map over uploadedImages array to extract the secure_url
                const formattedPictures = uploadedImages
                    .map((uploadedImage) => {
                        const secureUrl = uploadedImage?.cloudinaryResponse?.secure_url;
                        return secureUrl ? { img: secureUrl } : null; // Ensure valid URLs
                    })
                    .filter((item) => item !== null); // Remove null values

                promises = promises.concat(formattedPictures); // Append formatted pictures
                break; // Exit loop after processing array
            }
        }

        // Update the vehiclePictures field in updateData
        updateData.scrapLetterPictures = promises;
    }
    // userDocumentsPictures
    if (Array.isArray(reqData.userDocumentsPictures)) {
        let promises = [];

        for (let obj of reqData.userDocumentsPictures) {
            let imageLocation;

            // Check if the image is already a URL
            if (obj.img.startsWith("https://") || obj.img.startsWith("http://")) {
                imageLocation = obj.img; // Keep the existing URL
                promises.push({ img: imageLocation }); // Add to promises array
            } else {
                // Upload the base64 images and handle the response
                const uploadedImages = await upload.uploadArrayImage(
                    reqData.userDocumentsPictures,
                    "userDocumentsPictures"
                );

                // Map over uploadedImages array to extract the secure_url
                const formattedPictures = uploadedImages
                    .map((uploadedImage) => {
                        const secureUrl = uploadedImage?.cloudinaryResponse?.secure_url;
                        return secureUrl ? { img: secureUrl } : null; // Ensure valid URLs
                    })
                    .filter((item) => item !== null); // Remove null values

                promises = promises.concat(formattedPictures); // Append formatted pictures
                break; // Exit loop after processing array
            }
        }

        // Update the vehiclePictures field in updateData
        updateData.userDocumentsPictures = promises;
    }
    // enginePictures
    if (Array.isArray(reqData.enginePictures)) {
        let promises = [];

        for (let obj of reqData.enginePictures) {
            let imageLocation;

            // Check if the image is already a URL
            if (obj.img.startsWith("https://") || obj.img.startsWith("http://")) {
                imageLocation = obj.img; // Keep the existing URL
                promises.push({ img: imageLocation }); // Add to promises array
            } else {
                // Upload the base64 images and handle the response
                const uploadedImages = await upload.uploadArrayImage(
                    reqData.enginePictures,
                    "enginePictures"
                );

                // Map over uploadedImages array to extract the secure_url
                const formattedPictures = uploadedImages
                    .map((uploadedImage) => {
                        const secureUrl = uploadedImage?.cloudinaryResponse?.secure_url;
                        return secureUrl ? { img: secureUrl } : null; // Ensure valid URLs
                    })
                    .filter((item) => item !== null); // Remove null values

                promises = promises.concat(formattedPictures); // Append formatted pictures
                break; // Exit loop after processing array
            }
        }

        // Update the vehiclePictures field in updateData
        updateData.enginePictures = promises;
    }
    // arrayImages
    if (Array.isArray(reqData.arrayImages)) {
        let promises = [];

        for (let obj of reqData.arrayImages) {
            let imageLocation;

            // Check if the image is already a URL
            if (obj.img.startsWith("https://") || obj.img.startsWith("http://")) {
                imageLocation = obj.img; // Keep the existing URL
                promises.push({ img: imageLocation }); // Add to promises array
            } else {
                // Upload the base64 images and handle the response
                const uploadedImages = await upload.uploadArrayImage(
                    reqData.arrayImages,
                    "arrayImages"
                );

                // Map over uploadedImages array to extract the secure_url
                const formattedPictures = uploadedImages
                    .map((uploadedImage) => {
                        const secureUrl = uploadedImage?.cloudinaryResponse?.secure_url;
                        return secureUrl ? { img: secureUrl } : null; // Ensure valid URLs
                    })
                    .filter((item) => item !== null); // Remove null values

                promises = promises.concat(formattedPictures); // Append formatted pictures
                break; // Exit loop after processing array
            }
        }

        // Update the vehiclePictures field in updateData
        updateData.arrayImages = promises;
    }


    // Call the service to update the factory record
    try {
        const data = await factoryService.updateFactory(
            type,
            condition,
            updateData
        );
        logger.data("Updated Data", data);
        return responser.send(200, `Updated ${type} Record...`, req, res, data);
    } catch (error) {
        logger.error("Error updating factory", error);
        return responser.send(500, "Error updating record", req, res, { error });
    }
};


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
