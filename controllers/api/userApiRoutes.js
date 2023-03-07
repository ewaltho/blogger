const express = require('express');
const router = express.Router();
const { User, Post } = require('../../models');
const { Op } = require('sequelize');
const bcrypy = require('bcrypt');

router.get('/', async (req, res) => {
    try {
        const findUsers = await User.findAll({
            include: [Post],
        });
        res.json(findUsers);
    } catch (err) {
        console.log(err)
        res.status(500).json({msg: "An error has occured.", error: err});
    }
})

router.get('/:userid', async (req, res) => {
    try {
        const findOneUser = await User.findByPk(req.params.userid, {
            include: [Post],
        });
        res.json(findOneUser);
    } catch (err) {
        console.log(err)
        res.status(500).json({msg: "An error has occured.", error: err});
    }
});

router.post('/', async (req, res) => {
    try {
        const createNewUser = await User.create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });
        req.session.userId = createNewUser.id;
        req.session.username = createNewUser.username;
        req.session.email = createNewUser.email;
        req.session.loggedIn = true;
        res.send(createNewUser);
    } catch (err) {
        console.log(err)
        res.status(500).json({msg: "An error has occured.", error: err});
    }
});

router.post('/newpost/:userid', async (req, res) => {
    try {
        const sessionUserId = req.session.userId;
        const findOneUser = await User.findByPk(sessionUserId);
        if (!findOneUser) {
            res.status(404).json({msg:"No such user."}); 
        } else {
            const addPostToUser = await findOneUser.addPost(req.params.postid);
            res.json(addPostToUser);
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({msg: "An error has occured.", error: err});
    }
});

router.post('/signin', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then((userData) => {
            if (!userData) {
                return res.status(401).json({msg:"Incorrect email or password"});
            } else {
                if (bcrypt.compareSync(req.body.password, userData.password)) {
                    req.session.userId = userData.id;
                    req.session.username = userData.username;
                    req.session.email = userData.email;
                    req.session.loggedIn = true;
                    return res.json(userData);
                } else {
                    return res.status(401).json({msg:"Incorrect email or password"})
                }
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({msg: "Whoops", err});
        })
});

router.put('/remove/:postid', async (req, res) => {
    try {
        let sessionUserId = req.session.userId;
        const foundUser = await User.findByPk(sessionUserId, { include: Post });
        if (!foundUser) {
            res.json({msg:"No such user"});
        } else {
            const response = await foundUser.removePost(req.params.postid);
            if (!response) {
                res.json({msg: "No such post"});
            } else {
                res.json(response);
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "an error occured", error: err });
      }
});

router.delete('/logout', (req, res) => {
    req.session.destroy();
    res.send("Logged Out");
});

module.exports = router;