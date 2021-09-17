const httpStatus = require('http-status');
const { Parent } = require('../models');
const ApiError = require('../utils/ApiError');

 
/**
 * Query for parent
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryParents = async (filter, options) => {
  const parent = await Parent.paginate(filter, options);
  return parent;
};

/**
 * Get Parent by id
 * @param {ObjectId} id
 * @returns {Promise<Parent>}
 */
const getParentById = async (id) => {
  return Parent.findById(id);
};


/**
 * Delete Parent by id
 * @param {ObjectId} id
 * @returns {Promise<Parent>}
 */
const deleteParentById = async (id) => {
  const parent = await getParentById(id);
  if (!parent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Parent not found');
  }
  await parent.remove();
  return parent;
};

module.exports = {
  queryParents,
  getParentById,
  deleteParentById,
};
