const express = require("express");
const router = express.Router();
const { User, Post } = require("../models");

router.get("/",async (req,res) => {
   try{
      const postData = await Post.findAll({ include: [User]});
      res.json(postData);
   } catch(error){
      res.status(500).json({msg:"something went wrong", error})
   }
 });

 router.get("/:id",(req,res) => {
    Post.findByPk(req.params.id,{
     include:[User]
    }).then(postData => {
     res.json(postData)
    }).catch(err => {
     console.log(err);
     res.status(500).json({msg:"something went wrong", err})
    })
 })

 router.post("/",(req,res)=>{
    if (!req.session.userId){
       return res.status(403).json({msg:"please login first"})
    }
    console.log(req.body);
    Post.create({
     title:req.body.title,
     entry: req.body.entry,
     UserId:req.session.userId
    }).then(postData => {
     res.json(postData)
    }).catch(err => {
     console.log(err);
     res.status(500).json({msg:"something went wrong", err})
    })
 });

 router.delete("/:id",(req,res)=>{
    if(!req.session.userId){
       return res.status(403).json({msg:"please login first"})
    }
    console.log(req.body);
    Post.findByPk(req.params.id).then(postData => {
       if (!postData){
          return res.status(404).json({msg:"post does not exist"})
       } else if (postData.UserId !== req.session.userId){
          return res.status(403).json({msg:"not your post"})
       }
       Post.destroy({
        where:{
           id:req.params.id,
        }
       }).then(postData => {
         res.json(postData)
        }).catch(err => {
         console.log(err);
         res.status(500).json({msg:"something went wrong",err})
        })
    }).catch(err=>{
         console.log(err);
         res.status(500).json({msg:"something went wrong",err})
    })
 });

module.exports = router;