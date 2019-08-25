//Express middleware
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const verifiedToken = await jwt.verify(token, 'jsonwebtoken');

        const user = await User.findOne({ _id: verifiedToken._id, 'tokens.token': token }); //token.token:token we are doing this to make sure if token is still stored in the user(for sign out later)
        if (!user) throw new Error(); //stops try and trigger the catch

        req.user = user; //Storing user in req so that we can use it in route handler
        req.token = token;

        next();

    } catch (e) {
        res.status(401).send({ error: 'Please Authenticate' })
    }
}

module.exports = auth;