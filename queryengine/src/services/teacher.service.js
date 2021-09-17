const httpStatus = require('http-status');
const { Teacher } = require('../models');
const ApiError = require('../utils/ApiError');

 
/**
 * Query for teacher
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTeachers = async (filter, options) => {
  const teacher = await Teacher.paginate(filter, options);
  return teacher;
};

/**
 * Get Teacher by id
 * @param {ObjectId} id
 * @returns {Promise<Teacher>}
 */
const getTeacherById = async (id) => {
  return Teacher.findById(id);
};


/**
 * Delete Teacher by id
 * @param {ObjectId} id
 * @returns {Promise<Teacher>}
 */
const deleteTeacherById = async (id) => {
  const teacher = await getTeacherById(id);
  if (!teacher) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
  }
  await teacher.remove();
  return teacher;
};

module.exports = {
  queryTeachers,
  getTeacherById,
  deleteTeacherById,
};
