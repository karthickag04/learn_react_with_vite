const express = require("express");
const router = express.Router();
const User = require("../models/User");


// registration API
router.post("/register", async(req,res)=>{

    try{

        const {name,email,password,role} = req.body;

        const newUser = new User({
            name,
            email,
            password,
            role
        });

        await newUser.save();

        res.json({
            message:"User Registered Successfully"
        });

    }
    catch(error){
        res.status(500).json({
            error:error.message
        });
    }

});

module.exports = router;