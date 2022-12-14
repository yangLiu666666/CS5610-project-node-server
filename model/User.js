const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
// const RoleType = require("./RoleType");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String
    },
    token: {
        type: String
    },
    followers: {
        type:[String]
    },
    followings: {
        type:[String]
    },
    role: {
        // type: RoleType
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

userSchema.pre('save', async function(next){
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hashSync(user.password, 10);
    }
    next();
})

userSchema.statics.findByCredentials = async function(email, password) {
    const user = await User.findOne({email});
    if(!user) {
        throw new Error('Invalid credentials')
    }
    const passwordMatch = await bcrypt.compareSync(password, user.password)
    if(!passwordMatch) {
        throw new Error('Invalid credentials')
    }
    if (!user.isActive) {
        throw new Error("You are blocked")
    }
    //if there is a match
    return user;
}

userSchema.methods.generateToken = async function(){
    // the instance that's called the generate token
    const user = this;
    const token = await jwt.sign({_id: user._id}, "mealsSecret", {expiresIn: "720h"})
    user.token = token;
    await user.save();
    return token;
}

// Remove the information that we don't want to send
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    // delete userObject._id;
    return userObject;
}
const User = mongoose.model('User', userSchema);
module.exports = User