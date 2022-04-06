// This file will contain all of the user-facing routes, such as the homepage and login page.
const router = require('express').Router();
const sequelize = require('../config/connection.js');
const { Post, User, Comment } = require('../models');

// gets all posts and renders to 'homepage' with 'posts'
router.get('/', (req, res) => {

})

router.get('/post/:id', (req, res) => {
    // test post
    // const post = {
    //     id: 1,
    //     post_url: 'https://handlebarsjs.com/guide/',
    //     title: 'Handlebars docs',
    //     created_at: new Date(),
    //     star_count: 10,
    //     comments: [{}, {}],
    //     user: {
    //         username: 'jd_user'
    //     }
    // };
    // res.render('single-post', {post} )
})

module.exports = router;

// 
// get all posts for homepage
router.get('/', async (req, res) => {
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

// get single post
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

            res.render('single-post', { post });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    // handlebars name should be this 'login'
    // unless we choose another name, then we change it here
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    // handlebars name should be this 'signup'
    // unless we choose another name, then we change it here
    res.render('signup');
});

module.exports = router;