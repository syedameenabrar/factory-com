const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const { apiFeatures,logger } = require("database-connection-function-com")


// Unified getModel function with proper schema registration and error handling
const getModel = (type) => {
    if (mongoose.models[type]) {
        return mongoose.models[type];
    }

    // Define schema options
    const schemaOptions = {
        timestamps: true,
        strict: false,
    };

    // Define schema fields
    const schemaFields = {
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }, // Explicit reference to 'user' model
    };

    // Create schema and apply plugins
    const schema = new mongoose.Schema(schemaFields, schemaOptions);
    schema.plugin(paginate);
    schema.plugin(aggregatePaginate);

    // Register and return the model
    return mongoose.model(type, schema);
};


module.exports.createFactory = async (type, data) => {
    const model = getModel(type)
    const record = await model.create(data)
    return record
}



const populateQuery = [
    {
        path: 'createdBy',
        select: ['_id', 'username', 'email', 'phoneNumber'],
        strictPopulate: false // Disable strict populate
    }
];

module.exports.getAllFactories = async (type, data) => {
    const model = getModel(type);
    
    const record = await model.find(data).populate(populateQuery).exec();
    
    return record;
};

module.exports.getOneFactory = async (type, data) => {
    const model = getModel(type)
    const record = await model.findOne(data).populate(populateQuery)
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
        .populate(populateQuery)
        .exec(model);
    return record.data;
}