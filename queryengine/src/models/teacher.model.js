const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const teacherSchema = mongoose.Schema({
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
    bg: {
        type: String,
        requireed: true,
        enum: ['A', 'A-', 'B', 'B-', 'O', 'O-', 'AB', 'AB-']
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
    age: {
        type: Number,
        required: true,
    }
},
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
teacherSchema.plugin(toJSON);
teacherSchema.plugin(paginate);


/**
 * @typedef Teacher
 */
const Teacher = mongoose.model('Teacher', teacherSchema, 'teachers');

module.exports = Teacher;
