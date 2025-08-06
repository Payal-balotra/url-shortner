const { getUser } = require("../service/auth");

async function isUserIsLoggedIn(req, res, next) {
  const userId = req.cookies?.myCookie;
    console.log(userId)
  if (!userId) {
    return res.redirect("/login");
  }
  const user = getUser(userId);

  if (!user) {
    return res.redirect("/login");
  }

  req.user = user;
  next();
}


async function checkUser(req, res, next) {
  const userId = req.cookies?.myCookie;

  const user = getUser(userId);
  req.user = user;
  next();
}
module.exports ={
    isUserIsLoggedIn,
    checkUser   
}
