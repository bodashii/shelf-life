const router = require('express').Router();
const { User, Post, Star } = require('../../models');

// this is /api/users endpoint

// endpoint to get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude : ['password'] }
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
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        }
    })
    .then (dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// CREATE a user 
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.status(200).json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//login 
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            
        }
    })
})

// update
router.put('/:id', (req, res) => {

});

//log out
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})

router.delete('/:id', (req, res) => {
    User.destroy(req.params.id)
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;