const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll({

    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// POST comment when logged in
router.post('/', (req, res) => {
//     if (req.session)  {
//     Comment.create({
//         comment_text: req.body.comment_text,
//         user_id: req.session.user_id,
//         post_id: req.body.post_id,
//     })
//         .then(dbCommentData => res.json(dbCommentData))
//         .catch(err => {
//             console.error(err);
//             res.status(400).json(err);
//         })
//     }
});

// DELETE a comment 
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
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});


module.exports = router;