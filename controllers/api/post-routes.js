const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment, Star } = require('../../models');

// GET all posts with this end point
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
      // Query configuration
        attributes: ['id', 'post_url', 'title', 'created_at', [sequelize.literal('(SELECT COUNT(*) FROM star WHERE post.id = star.post_id)'), 'star_count']],
        order: [['created_at', 'DESC']],
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
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET posts by 'id'
router.get('/:id/', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'post_url', 'title', 'created_at'],
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
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id.' });
            return;
        }
        res.status(200).json(dbPostData)
    })
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
})

// POST, lets you create POST with the title, post_url, user_id
router.post('/new_post', (req, res) => {
    // must be logged in to create a post with req.session
    if (req.session) {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        post_url: req.body.post_url,
        user_id: req.body.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});

// PUT /api/posts/star
router.put('/star', (req, res) => {
    // make sure the session exists first
    if (req.session) {
        // pass session id along with all destructured properties on req.body
        Post.star({ ...req.body, user_id: req.session.user_id }, { Star, Comment, User })
        .then(updatedStarData => res.json(updatedStarData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});

// DELETE a post from the given id param
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;