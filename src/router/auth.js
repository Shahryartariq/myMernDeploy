const express = require("express");
const router = express.Router();
require("../db/conn");
const User = require("../models/userSchema");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

//middle ware
const Authenticate = require("../middleware/Authenticate");

router.use(cookieParser());
/*const middleware = (res, req, next) => {
  console.log("Start Middle ware");
  next();
};

router.get("/", (req, res) => {
  res.send("Hello World from the express Router");
});

router.get("/about", middleware, (req, res) => {
  console.log("Start About Page ");
  res.send("About ");
});

router.get("/contact", (req, res) => {
  res.cookie("Test", "Sherry");
  res.send("Contact");
});
router.get("/login", (req, res) => {
  res.send("Login");
});

router.get("/register", (req, res) => {
  res.send("register");
});*/

//using promises .then catch way
/*
router.post("/register", (req, res) => {
  const { name, email, phone, work, password } = req.body;

  if (!name || !email || !phone || !work || !password) {
    return res.status(422).json({ errorMessage: "Fill the form Properly" });
  }

  User.findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ errorMessage: "Email Already Exist" });
      }

      const user = new User({
        name: name,
        email: email,
        phone: phone,
        work: work,
        password: password,
      });

      user
        .save()
        .then(() => {
          res.status(201).json({ Message: "User Registered Successfully" });
        })
        .catch((err) => {
          res.status(500).json({ errorMessage: "Fail to register" });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});
*/

//using Async await
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ errorMessage: "Fill the form Properly" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ errorMessage: "Email Already Exist" });
    } else if (password !== cpassword) {
      return res.status(422).json({ errorMessage: "Password is not matching" });
    } else {
      const user = new User({
        name: name,
        email: email,
        phone: phone,
        work: work,
        password: password,
      });
      //Hashing middleware work here
      await user.save();
      res.status(201).json({ Message: "User Registered Successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please fill the data" });
    }

    const userLogin = await User.findOne({ email: email });
    console.log(userLogin);
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      //JWT Start
      const token = await userLogin.generateAuthToken();
      console.log("Login Token Part: " + token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 2589000000),
        httpOnly: true,
      });

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid Credentials P" });
      } else {
        res.json({ message: "User Signin Successfully" });
      }
    } else {
      return res.status(400).json({ error: "Invalid Credentials M" });
    }
  } catch (err) {
    console.log(err);
  }
});

//about ka page
router.get("/about", Authenticate, (req, res) => {
  console.log("Hello My About");
  res.send(req.rootUser);
});

//logout ka page
router.get("/logout", Authenticate, (req, res) => {
  console.log("Hello My logout Page");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User Logout");
});

//contact ka page (get user data)
router.get("/getdata", Authenticate, (req, res) => {
  console.log("Hello My user Data");
  res.send(req.rootUser);
});

//contact ka page - add message
router.post("/contact", Authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      console.log("Error in Contact Form");
      return res.json({ error: "Pleaes Fill The Contact Form" });
    }

    const userContact = await User.findOne({ _id: req.userID });

    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );
      await userContact.save();
      res.status(201).json({ Message: "User Contact Successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
