const express = require("express");
const app = express();
const path = require("path");
const staticRoutes = require("./routes/staticRoutes");
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");
const PORT = 8000;
const connection = require("./connection/url");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const { isUserIsLoggedIn, checkUser } = require("./middlewares/auth");

connection();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "ejs");
// app.set('views', path.resolve("./views")); // optional

app.use("/url",isUserIsLoggedIn, urlRoute)
app.use("/user", userRoute);
app.use("/",checkUser, staticRoutes);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timeStamp: Date.now() },
      },
    }
  );

  if (!entry) {
    return res.status(404).send("Short URL not found");
  }

  return res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => {
  console.log("localhost started on ", PORT);
});
