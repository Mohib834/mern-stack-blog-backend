const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: 'String',
        trim: true,
        lowercase: true
    },
    email: {
        type: 'String',
        unique: true,
    },
    password: {
        type: 'String'
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    }],
    tokens: [
        {
            token: {
                type: String,
                requred: true
            }
        }
    ]
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid Credentials !');
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Invalid Credentials !');
    }
    return user;
}


userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'jsonwebtoken');
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;
