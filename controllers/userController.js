const express = require('express');
const router = express.Router();
const { User, Post } = require('../models');
const bcrypt = require('bcrypt');

router.get("/",(req,res)=>{
    User.findAll().then(userData=>{
     res.json(userData)
    }).catch(err=>{
     console.log(err);
     res.status(500).json({msg:"oh noes!",err})
    })
 })

 router.get("/logout",(req,res)=>{
     req.session.destroy();
     res.send("logged out")
 })

 router.get("/:id",(req,res)=>{
    User.findByPk(req.params.id,{
     include:[Post]
    }).then(userData=>{
     res.json(userData)
    }).catch(err=>{
     console.log(err);
     res.status(500).json({msg:"oh noes!",err})
    })
 });

router.post("/",(req,res)=>{
    console.log(req.body);
   User.create({
    email:req.body.email,
    username:req.body.username,
    password:req.body.password
   }).then(userData=>{
    req.session.userId = userData.id;
    req.session.userEmail = userData.email;
    req.session.loggedIn = true
    res.json(userData)
   }).catch(err=>{
    console.log(err);
    res.status(500).json({msg:"oh noes!",err})
   })
})

router.post("/signin", async (req,res)=>{
    console.log(req.body)
    try {
        const user = await User.findOne({
        where:{
         email:req.body.email
        }
        })
        if(!user){
            return res.status(400).json({msg:"incorrect email"})
        }
        const validPassword = user.checkPassword(req.body.password)
        if (!validPassword) {
            return res.status(400).json({msg:"incorrect password"})
        }
    
        req.session.save(() => {
            req.session.userId = user.id
            req.session.username = user.username
            req.session.loggedIn = true
            res.json({user,message:"You are logged in!"})
        }) 
    } catch (err) {
        res.status(400).json({msg:"something went wrong", err})
    }
 });

module.exports = router;
