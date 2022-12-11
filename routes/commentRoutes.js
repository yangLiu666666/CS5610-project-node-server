const router = require('express').Router();
const Comment = require('../model/Comment')
const authUser = require('../middleware/authUser');

router.post('/comments', authUser, async(req, res)=> {
    const {mealId, comment} = req.body;
    const user = req.user;
    const newComment = {uid: user._id, content: comment, name: user.name, date: new Date()}
    let meal = await Comment.findOne({mealId})
    if (!meal) {
        meal = await Comment.create({mealId});
    }
    if (!meal.comment) {
        meal.comment = [newComment];
    } else {
        meal.comment.push(newComment)
    }
    const result = await meal.save();
    //return whole meal
    res.status(200).send(result)
})

router.delete('/comments', authUser, async(req, res)=> {
    const {mealId, comment_id} = req.body;
    const meal = await Comment.findOne({mealId})
    meal.comment = meal.comment.filter((c) => {
        return comment_id !== c._id.toString()
    })
    await meal.save();
    res.status(200).send("successful")
})

router.get('/meals/:mealId/comments',authUser, async(req, res)=> {
    const mealId = req.params['mealId'];
    const comments = await Comment.find({ mealId });
    res.status(200).send(comments);
})

router.put('/comments', authUser, async(req, res)=> {
    const {mealId, comment, comment_id} = req.body;
    const meal = await Comment.findOne({mealId})
    meal.comment = meal.comment.map((c) => {
        if (c._id.toString() === comment_id) {
            c.content = comment
        }
        return c;
    })
    const result = await meal.save();
    res.status(200).send(result)
})

module.exports = router;