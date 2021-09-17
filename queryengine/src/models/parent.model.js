const mongoose = require("mongoose")
const validator = require('validator');
const { toJSON, paginate } = require('./plugins')

const parentSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        gender: {
            type: String,
            required: true,
            enum: ['Male', 'Female'],
        },
        occupation: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
    },
    {
        timestamps: true,
    }
)


// add plugin that converts mongoose to json
parentSchema.plugin(toJSON);
parentSchema.plugin(paginate);


/**
 * @typedef Parent
 */
const Parent = mongoose.model('Parent', parentSchema, 'parents');
module.exports = Parent;