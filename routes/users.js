const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcrypt');

// Register

router.post('/register', async (req, res) => {
    try {
        // Generate new passwordKey
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        // Create new username
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })
        // Save user and send response
        const user = await newUser.save();
        res.status(200).json(user._id);
    } catch (err) {
        res.status(500).send(err)
    }
})




// Login
router.post('/login', async (req, res) => {
    try {
        // Find username
        const user = await User.findOne({ username: req.body.username })
        !user && res.status(400).json("Wrong user name or password")

        // Validate passwordKey
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("Wrong username or password")

        // Send response
        res.status(200).json({ _id: user._id, username: user.username, email: user.email })

    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;