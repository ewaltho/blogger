const express = require("express");
const router = express.Router();
const { User, Post} = require("../../models");

router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll();
        res.json(allPosts);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "an error occured", error: err });
      }
});

router.get('/:postid', async (req, res) => {
    try {
        const foundPost = await Post.findByPk(req.params.postid);
        if (foundPost) {
            resizeBy.json(foundPost);
        } else {
            res.status(404).json({ msg: 'no post by that id'})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:"an error occured", error: err});
    }
});

// router.post('/newpost' (req, res) => {
//         const createPost = await Post.create({
//             title: req.body.title,
//             entry: req.body.entry
//         });
// }); //copied from like 34 of plantApiRoutes.js idk what to do

module.exports = router;