const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers['token']
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        if (verifyToken) {
            next()
        } else {
            res.status(400).json({ msg: "Invalid Token", status: 400 })
        }
    } catch (error) {
        res.status(400).json({ msg: "Invalid Token", status: 400 })
    }
}