const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
const apiRoutes = require('./api');

router.use('/', homeRoutes);

// this is the endpoints for our api routes bundled up
// putting the /api prefix here, so we dont have to use it in our api routes
router.use('/api', apiRoutes);


router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;