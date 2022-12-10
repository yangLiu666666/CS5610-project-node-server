const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    mealId: {
        type: String
    },
    comment:
        [{
            uid: String,
            content: String,
            date: Date
        }]

})
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment