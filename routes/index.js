var express = require("express");
var router = express.Router();

const feeds = require("../models/feeds");

/* GET home page. */
router.post("/", function (req, res, next) {
  let find = {};
  if (req.body.search) {
    find = {
      $or: [
        {
          title: {
            $regex: req.body.search,
            $options: "i",
          },
        },
        {
          author: {
            $regex: req.body.search,
            $options: "i",
          },
        },
        {
          tech: {
            $regex: req.body.search,
            $options: "i",
          },
        },
      ],
    };
  }

  if (req.body.filter) {
    const key = req.body.filter[0];

    if (!["author", "tech"].includes(key)) {
      return res.status(400).json({
        success: false,
        message: `Invalid filter selected`,
      });
    }

    const value = req.body.filter[1];

    find[key] = value;
  }

  feeds
    .find(find)
    .sort({ createdAt: -1 })
    .then((feeds) => res.status(200).json({ success: true, feeds }));
});

module.exports = router;
