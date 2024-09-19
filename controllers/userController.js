const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const User = require('../models/userModel');
const { jwtUtil } = require("../utils/jwtUtil");

// @desc Register a user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req,res)=> {
    const {username, email, password} = req.body;
    if(!username.trim() || !email.trim() || !password.trim()){
        throw new ApiError(400, "All fields are mandatory");
    }
    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new ApiError(400, "User already registered");
    }

    const user = await User.create({username, email, password});
    if(user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        throw new ApiError(400, "Invalid user credentials");
    }
});


// @desc Login a user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req,res)=> {
    const { email, password } = req.body;
    if(!email.trim() || !password.trim()){
        throw new ApiError(400, "All fields are mandatory");
    }
    const user = await User.findOne({email});
    if(user && (await user.isPasswordCorrect(password))){

        const token = jwtUtil.sign({ 
                id: user.id,
                username: user.username,
                email: user.email
         });

        const loggedInUser = await User.findById(user._id).select("-password");

        return res.status(200).json({ message: "Login Successfully", user: loggedInUser, token });
    } else {
        throw new ApiError(401, "Invalid email or password");
    }
});


// @desc Show current user info
// @route POST /api/users/current
// @access private
const currentUser = asyncHandler(async (req,res)=> {
    res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser }