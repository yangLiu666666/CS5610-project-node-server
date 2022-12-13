const router = require('express').Router();
const User = require('../model/User')
const authUser = require('../middleware/authUser');
const Comment = require('../model/Comment')

//User Creation
router.post('/users', async (req, res) => {
    const {email, password, role, name, country} = req.body;
    try {
        const user = await User.create({email, password, role, name, country});
        await user.generateToken();
        res.send(user)
    } catch(e) {
        let msg;
        if (e.code === 11000) {
            msg = 'Email already exists'
        } else {
            msg = e.message;
        }
        res.status(500).send(msg);
    }
})

//Login
router.post('/login', async(req, res)=> {
    const {email, password} = req.body;
    try {
        const user = await User.findByCredentials(email, password);
        await user.generateToken();
        res.status(200).send(user)
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }
})

router.post('/auto-login', authUser, async(req, res)=> {
    // req.user.toObject()
    res.send(req.user.toObject())
})

router.post('/logout', authUser, async (req, res)=> {
    const user = req.user;
    user.token = '';
    await user.save();
    res.status(200).send("successful")
})

router.post('/:uidA/follow/:uidB', authUser, async(req, res) => {
    const uidA = req.params['uidA']
    const uidB = req.params['uidB']
    const userA = await User.findOne({_id: uidA})
    const userB = await User.findOne({_id: uidB})
    if (!userA || !userB) {
        throw new Error("User does not exist")
    }
    userA.followings.push(uidB);
    userB.followers.push(uidA);
    console.log(userA, userB)
    const result = await userA.save();
    await userB.save();
    res.status(200).send(result)
})

router.get('/users/:uid/followers', authUser, async (req, res) => {
    const uid = req.params['uid']
    const user = await User.findOne({_id: uid})
    let followers = await User.find({_id: user.followers })
    followers = followers.map((u)=> {
        u.token = null;
        return u;
    })
    res.status(200).send(followers)

})

router.get('/users/:uid/followings', authUser, async (req, res) => {
    const uid = req.params['uid']
    const user = await User.findOne({_id: uid})
    let followings = await User.find({_id: user.followings })
    followings = followings.map((u)=> {
        u.token = null;
        return u;
    })
    res.status(200).send(followings)
})

router.get('/users/:uid', authUser, async (req, res) => {
    const uid = req.params['uid'];
    const user = await User.findOne({_id: uid})
    // delete user.password;
    user.token = null;
    res.status(200).send(user)
})
router.get('/users/:uid/comments', authUser, async(req, res) => {
    const uid = req.params['uid'];
    const user = await User.findOne({_id: uid})
    // const comments = await Comment.findOne({uid});
    // res.status(200).send(comments)
    let comments = await Comment.find({ uid: user._id })
    res.status(200).send(comments)
})
router.delete('/:uidA/follow/:uidB', authUser, async (req, res)=> {
    const uidA = req.params['uidA']
    const uidB = req.params['uidB']
    const userA = await User.findOne({_id: uidA})
    const userB = await User.findOne({_id: uidB})
    if (!userA || !userB) {
        throw new Error("User does not exist")
    }
    userA.followings.remove(uidB);
    userB.followers.remove(uidA);
    console.log(userA, userB)
    const result = await userA.save();
    await userB.save();
    res.status(200).send(result)
})

module.exports = router;