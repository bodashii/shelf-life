// serve as a means to collect all of the API routes and package them up for us.
const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const commentRoutes = require('./comment-routes.js');

router.use('/users', userRoutes);
router.use('/comments', commentRoutes);

module.exports = router;