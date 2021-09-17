const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { studentService } = require('../services');


const getStudents = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await studentService.queryStudents(filter, options);
  res.send(result);
});

const getStudent= catchAsync(async (req, res) => {
  const student = await studentService.getStudentById(req.params.id);
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }
  res.send(student);
});


const deleteStudent = catchAsync(async (req, res) => {
  await studentService.deleteStudentById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    getStudents,
    getStudent,
    deleteStudent
};
