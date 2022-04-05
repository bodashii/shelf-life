const router = require('express').Router();
const { Comment } = require('../../models');

// endpoint /api/comments & THIS WORKS
router.get('/', (req, res) => {
    Comment.findAll({
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// POST comment works in Insomnia, have to test when logged in on front end
router.post('/', (req, res) => {
    if (req.session)  {
    Comment.create({
        comment_text: req.body.comment_text,
        // user_id: req.body.user_id,
        user_id: req.session.user_id,
        post_id: req.body.post_id,
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.error(err);
            res.status(400).json(err);
        })
    }
});

//included for scalability purposes - unless we'v added an edit comment button - 4/5/2022 12:59pm
// wrapped in an if req.session, because they'd have to be logged in to edit their exisiting comment
router.put('/:id', (req, res) => {
    // if (req.session) {
    Comment.update(
        {
            comment_text: req.body.comment_text
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id.' });
            return;
        }
        res.status(200).json(dbCommentData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
    // }
});

// DELETE a comment & THIS WORKS
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: { 
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No Comment found with this id '})
        }
        res.status(200).json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});


module.exports = router;