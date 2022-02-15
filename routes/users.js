var express = require("express");
var router = express.Router();
const user_model = require("../models/user");
const { register } = require("../validators/user.validator");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/images/users");
  },
  filename: (req, file, cb) => {
    cb(null, `image-${Date.now()}.jpeg`);
  },
});

const upload = multer({ storage: storage });

router.get("/", function (req, res, next) {
  const user_id =
    req.session && req.session.user
      ? req.session.user._id
      : req.query && req.query.id
      ? req.query.id
      : undefined;

  if (user_id === undefined) {
    return res.status(400).json({
      success: false,
      message: "User id is required",
    });
  }

  const user = user_model
    .findById(user_id)
    .select("-password")
    .then((user) => res.json({ user, success: true }));
});

router.post("/", upload.single("profile_image"), function (req, res, next) {
  const { error } = register(req.body);
  if (error) return res.status(400).json({ success: false, error });

  if (req.file) {
    req.body.imageUrl = `/images/users/${req.file.filename}`;
  }

  if (req.session && req.session.user) {
    delete req.body.password;

    user_model
      .findByIdAndUpdate(req.session.user._id, {
        ...req.body,
      })
      .then((user) => {
        req.session.user = user;

        res.status(200).json({ success: true, user });
      });
  } else {
    user_model.create(req.body).then((user) => {
      req.session.user = user;

      res.status(200).json({ success: true, user });
    });
  }
});

module.exports = router;
