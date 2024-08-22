const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const { apiFeatures,logger } = require("common-function-api")

// const getModel = (type) => {
//     return mongoose.models[type] || mongoose.model(type, new mongoose.Schema({}, { strict: false }));
// }

// Updated getModel function to include pagination plugins
const getModel = (type) => {
    if (mongoose.models[type]) {
        return mongoose.models[type];
    }
    // Combine the options into a single object
    const schemaOptions = {
        timestamps: true,
        strict: false,
    };
    // Create the schema with the options
    const schema = new mongoose.Schema({}, schemaOptions);
    // Apply the plugins to the schema
    schema.plugin(paginate);
    schema.plugin(aggregatePaginate);
    // Return the model
    return mongoose.model(type, schema);
}


module.exports.createFactory = async (type, data) => {
    const model = getModel(type)
    const record = await model.create(data)
    return record
}

module.exports.getAllFactories = async (type, data) => {
    const model = getModel(type)
    const record = await model.find(data)
    return record
}

module.exports.getOneFactory = async (type, data) => {
    const model = getModel(type)
    const record = await model.findOne(data)
    return record
}

module.exports.updateFactory = async (type, factoryId, data) => {
    const model = getModel(type)
    const record = await model.findOneAndUpdate(factoryId, data, { new: true })
    return record
}

module.exports.deleteFactory = async (type, data) => {
    const model = getModel(type)
    const record = await model.findByIdAndDelete(data)
    return record
}

module.exports.getAllFactoriesWithPaginations = async (type, query) => {
    logger.data("typpppppppp", type);
    const model = getModel(type);
    logger.data("model", model);
    const record = await new apiFeatures(query)
        .filter()
        .orRegexMultipleSearch("searchFilter")
        .sort()
        .paginate()
        .exec(model);
    return record.data;
}