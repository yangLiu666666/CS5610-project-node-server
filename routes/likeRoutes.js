const router = require('express').Router();
const Like = require('../model/Like')
const authUser = require('../middleware/authUser');

router.post('/likes', authUser, async(req, res)=> {
    const {mealId} = req.body;
    const user = req.user;
    const like = await Like.create({uid: user._id, mealId});
    res.status(200).send("successful")
})

router.delete('/dislikes', authUser, async(req, res)=> {
    const {mealId} = req.body;
    const user = req.user;
    const like = await Like.remove({uid: user._id, mealId});
    res.status(200).send("successful")
})

router.get('/users/:uid/likes',authUser, async(req, res)=> {
    const uid = req.params['uid'];
    const likes = await Like.find({uid});
    res.status(200).send(likes);
})

module.exports = router;