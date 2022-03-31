const router = require('express').Router();
const { User, Post, Star } = require('../../models');

// this is /api/users endpoint

// endpoint to get all users
router.get('/', (req, res) => {
    User.findAll({
        // when getting all users, Post and Star will be included
        include: [Post, Star],
    })
    .then (dbUserData => {
        res.status(200).json(dbUserData);
        // res.json(dbUserData)
    })
    .catch (err => {
        console.log(err);
        // 500 status means our connection isn't established
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {

});

router.post('/', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;