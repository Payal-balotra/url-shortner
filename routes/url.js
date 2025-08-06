const express = require("express");
const {createShortUrls, handleAnalytics} = require("../controllers/url");
const router = express.Router();


router.post("/",createShortUrls);

router.get("/analytics/:shortId",handleAnalytics);

module.exports = router;
