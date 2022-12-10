const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    uid: {
        type: String
    },
    mealId: {
        type: String
    }
})

const Like = mongoose.model('Like', likeSchema);
module.exports = Like