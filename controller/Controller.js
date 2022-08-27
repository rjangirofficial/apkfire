const User = require('../model/User');
const Apps = require('../model/Apps');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
        if (password === user.password) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.status(200).json({ msg: "Logged In", token, status: 200 })
        } else {
            res.status(400).json({ msg: "Password Does Not Match", status: 400 })
        }
    } else {
        res.status(400).json({ msg: "User Not Found", status: 400 })
    }
}

const verify = async (req, res) => {
    res.json({ msg: "Verified" })
}


const addapp = async (req, res) => {
    try {
        const { name, logourl, publisher, category, modfeature, version, size, price, link } = req.body
        const apps = await Apps.create({
            name, logourl, publisher, category, modfeature, version, size, price, link
        })
        if (apps) {
            res.status(201).json({ msg: "Added", status: 201 })
        }
    } catch (error) {
        res.status(400).json({ msg: "Failed", status: 400 })
    }
}

const apps = async (req, res) => {
    try {
        const apps = await Apps.find({}).select('-price -size -publisher -category')
        res.send(apps)
    } catch (error) {
        res.status(400).json({ msg: "Data Not Found", status: 400 })
    }
}


const appsbyid = async (req, res) => {
    try {
        const apps = await Apps.findById(req.params.id)
        res.send(apps)
    } catch (error) {
        res.status(400).json({ msg: "Data Not Found", status: 400 })
    }
}

const deletebyid = async (req, res) => {
    const apps = await Apps.findByIdAndDelete(req.params.id)
    if (apps) {
        res.status(200).json({ msg: "Deleted", status: 200 })
    } else {
        res.status(400).json({ msg: "Failed To Delete", status: 400 })
    }
}


const searchapp = async (req, res) => {
    try {
        let apps = await Apps.find({
            "$or": [
                { "name": { $regex: req.params.key } }
            ]
        })
        res.send(apps)
    } catch (error) {
        res.status(400).json({ msg: "Data Not Found", status: 400 })
    }
}



module.exports = { login, verify, addapp, apps, appsbyid, deletebyid, searchapp }