const express = require('express');
const docsRoute = require('./docs.route');
const studentRoute = require('./students.route')
const parentRoute = require('./parents.route')
const teacherRoute = require('./teachers.route')

const router = express.Router();

const defaultRoutes = [
  {
    path: '/docs',
    route: docsRoute,
  },
  {
    path: '/student',
    route: studentRoute,
  },
  {
    path: '/parent',
    route: parentRoute,
  },
  {
    path: '/teacher',
    route: teacherRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
