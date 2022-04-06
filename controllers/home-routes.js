// This file will contain all of the user-facing routes, such as the homepage and login page.
const router = require('express').Router();
const sequelize = require('../config/connection.js');
const { Post, User, Comment } = require('../models');

// should be homepage
router.get('/', (req, res) => {
    res.render('homepage')
})


// get all posts which we use a handlebars to connect with
router.get('/posts', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('all-posts', { posts });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get single post .findByPk primary key
router.get('/post/:id', async (req, res) => {
    try {
        // takes in the single entry, byPk/:id
        const postData = await Post.findByPk(req.params.id, {
            include: [
                User,
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });

        if (postData) {
            const post = postData.get({ plain: true });

            res.render('../views/single-post', { post });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// checks if the user is logged in, 
router.get('/login', (req, res) => {
    // if (req.session.loggedIn) {
        res.redirect('../views/all-posts.handlebars');
        // return;
    // }

    
    // unless we choose another name, then we change it here
    res.render('all-posts');
});

// checks if the user is logged in, 
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('../views/all-posts.handlebars');
        return;
    }


    // unless we choose another name, then we change it here
    res.render('all-posts');
});

module.exports = router;