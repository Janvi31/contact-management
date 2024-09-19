const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name"],
    },
    email: {
        type: String,
        required: [true, "Please add the user email address"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please add the user password"],
    },
}, {timestamps: true});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("User", userSchema);