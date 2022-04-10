const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const shelfRoutes = require('.shelf-routes.js');


// this is the endpoints for our api routes bundled up
// putting the /api prefix here, so we dont have to use it in our api routes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/shelf', homeRoutes);

module.exports = router;