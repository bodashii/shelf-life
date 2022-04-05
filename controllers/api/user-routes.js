const router = require('express').Router();
const { User, Post, Star, Comment } = require('../../models');

// this is /api/users endpoint

// this WORKS
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

// this WORKS sorta
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_url', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            },
            {
                model: Post,
                attributes: ['title'],
                through: Vote,
                as: 'voted_posts'
            }
        ],
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
// this works for now, the req.session.save will be when the front end is up and running
router.post('/', (req, res) => {
    // from the form submit, will call on these 
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    // .then(dbUserData => res.status(200).json(dbUserData))
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.status(200).json(dbUserData);
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//login
// Cannot read properties of undefined (reading 'save') when trying to login with Insomnia
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Invalid password!' });
            return;
        }

        req.session.save(() => {
            //declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
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
});

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