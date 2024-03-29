// This file will contain all of the user-facing routes, such as the homepage and login page.
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// renders login view first
router.get('/', (req, res) => {
    console.log('==================');
    Post.findAll({
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM star WHERE post.id = star.post_id)'), 'star_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
      .then(dbPostData => {
          const posts = dbPostData.map(post => post.get({ plain: true}));
        
          res.render('homepage', {
              posts,
              loggedIn: req.session.loggedIn
          });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
    });
});


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

            res.render('single-post', { post });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// checks if the user is logged in, then will be redirected to homepage
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    // handlebars name should be this 'login'
    // unless we choose another name, then we change it here
    res.render('login');
});

module.exports = router;