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
    //     vote_count: 10,
    //     comments: [{}, {}],
    //     user: {
    //         username: 'jd_user'
    //     }
    // };
    // res.render('single-post', {post} )
})