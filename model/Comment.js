const mongoose = require('mongoose')
// const {Premium} = require("./RoleType");
const commentSchema = new mongoose.Schema({
    mealId: {
        type: String
    },
    comment:
        [{
            uid: String,
            // role: Premium,
            name: String,
            content: String,
            date: Date
        }]

})
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment