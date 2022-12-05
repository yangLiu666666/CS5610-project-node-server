const router = require('express').Router();
const User = require('./model/userModel')
router.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.send(user)
    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router;