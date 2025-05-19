const User = require("../models/user");
const {v4:uuidv4} = require("uuid");
const {setUser}=require("../Service/auth");
const { set } = require("mongoose");

async function handleUserSignup(req, res) {
    const {name,email,password} = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({ error: "email, password and name are required" });
    }
    const user = await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}

async function handleUserLogin(req, res) {
    const {email,password} = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "email and password are required" });
    }
    const user = await User.findOne({email,password});
    if(!user){
        return res.status(400).json({ error: "Invalid email or password" });
    }
    //const sessionId = uuidv4();
    //setUser(sessionId,user);
    const token=setUser(user);
    //res.cookie("uid",sessionId);
    res.cookie("uid",token);
    return res.redirect("/");
}

module.exports = {handleUserSignup,handleUserLogin};