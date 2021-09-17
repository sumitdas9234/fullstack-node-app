const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const studentSchema = mongoose.Schema(
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
    bg: {
      type: String,
      requireed: true,
      enum: ['A', 'A-', 'B', 'B-', 'O', 'O-', 'AB', 'AB-']
    },
    dob: {
      type: Date,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
studentSchema.plugin(toJSON);
studentSchema.plugin(paginate);


/**
 * @typedef Student
 */
const Student = mongoose.model('Student', studentSchema, 'students');

module.exports = Student;
