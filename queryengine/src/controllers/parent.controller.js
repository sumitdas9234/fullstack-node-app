const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { parentService } = require('../services');


const getParents = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await parentService.queryParents(filter, options);
  res.send(result);
});

const getParent= catchAsync(async (req, res) => {
  const parent = await parentService.getParentById(req.params.id);
  if (!parent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Parent not found');
  }
  res.send(parent);
});


const deleteParent = catchAsync(async (req, res) => {
  await parentService.deleteParentById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    getParents,
    getParent,
    deleteParent
};
