const router = require('express').Router();
const User = require('../model/User')
const authUser = require('../middleware/authUser');

//User Creation
router.post('/users', async (req, res) => {
    // const {email, password} = req.body;
    try {
        const user = await User.create(req.body);
        await user.generateToken();
        res.send(user)
    } catch(e) {
        // console.log(e)
        // res.status(500).send()
        let msg;
        if (e.code === 11000) {
            msg = 'Email already exists'
        } else {
            msg = e.message;
        }
            // console.log(e);
            // res.status(500).send();
        res.status(500).json(msg);
    }
    // try {
    //     const user = await User.create({email, password});
    //     await user.generateToken();
    //     // res.send(user)
    //     res.status(200).send();
    // } catch(e) {
    //     // console.log(e)
    //     // res.status(500).send()
    //     let msg;
    //     if (e.code === 11000) {
    //         msg = 'Email already exists'
    //     } else {
    //         msg = e.message;
    //     }
    //     // console.log(e);
    //     // res.status(500).send();
    //     res.status(500).json(msg);
    // }
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
    res.send(req.user)
})

router.post('/logout', authUser, async (req, res)=> {
    const user = req.user;
    user.token = '';
    await user.save();
    res.status(200).send()
})

router.post('/add-favorites', authUser, async(req, res)=> {
    const {mealId} = req.body;
    console.log(req.body)
    const user = req.user;
    user.favorites.push(mealId);
    await user.save();
    res.status(200).send(user)
})

router.post('/remove-favorites', authUser, async(req, res)=> {
    const {mealId} = req.body;
    const user = req.user;
    user.favorites = user.favorites.filter(id => id !== mealId);
    await user.save();
    res.status(200).send(user)
})

module.exports = router;