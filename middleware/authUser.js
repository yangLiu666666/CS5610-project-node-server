const jwt = require('jsonwebtoken')
const User = require('../model/User')
const authUser = async (req, res, next)=> {
    try {
        console.log(req.header('Authorization'));
        const userToken = req.header('Authorization').replace('Bearer ','');
        //console.log(req.header('Authorization').replace('Bearer ', ''))
        const decodedToken = jwt.verify(userToken, 'mealsSecret');
        console.log(decodedToken);
        const user = await User.findOne({_id: decodedToken._id})
        if (!user) {
            return res.status(404).json('Please authenticate');
        }
        req.user = user;
        next();
    } catch(e) {
        console.log(e);
        res.status(403).send("You are not authorized, please login");
    }
}

module.exports = authUser;