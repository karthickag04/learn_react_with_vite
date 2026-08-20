const express = require("express");
const router = express.Router();
const User = require("../models/User");


// ==========================
// GET ALL USERS
// ==========================
router.get("/", async (req, res) => {

    try {

        const users = await User.find();

        res.json({
            message: "Users fetched successfully",
            users: users
        });

    }
    catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// registration API
router.post("/register", async(req,res)=>{

    console.log("BODY:", req.body);

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






// ==========================
// LOGIN USER
// ==========================
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        // Find user using email
        const user = await User.findOne({ email: email });

        // User does not exist
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Check password
        if (user.password !== password) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Login successful
        res.json({
            message: "Login Successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    }
    catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});




// ==========================
// DELETE USER BY ID
// ==========================
router.delete("/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        // User not found
        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User deleted successfully",
            user: {
                id: deletedUser._id,
                name: deletedUser.name,
                email: deletedUser.email,
                role: deletedUser.role
            }
        });

    }
    catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


module.exports = router;