const User = require("../models/user")
const {v4 : uuidv4} =  require("uuid");
const {setUser,getUser} = require("../service/auth")


const handleUserSignUp = async(req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
       return res.send("all felids required");
    }

    await User.create({
        name,
        email,          
        password
    });

    return res.redirect("/login");

}
const handleUserLogin = async(req,res)=>{
    const {email,password} = req.body;
    if( !email || !password){
        return res.send("all felids required");
    }

    const user = await User.findOne({email,password});
    if(!user){
        return res.render("login", {err:"invalid email or password"});
    }
    const sessionId= uuidv4();
    setUser(sessionId,user);
    res.cookie("myCookie",sessionId);

    return res.redirect("/");

}

module.exports = {
    handleUserSignUp,
    handleUserLogin
}