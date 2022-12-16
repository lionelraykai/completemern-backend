const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("../db/collection");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("welcome to the mern server for router");
});

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill the empty filled" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      res.status(422).json({ error: "User alredy exists" });
    } else if (password != cpassword) {
      res
        .status(422)
        .json({ error: "Confirm password is not same as the Password" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      const userRegister = await user.save();

      if (userRegister) {
        res.status(201).json({ message: "User Register successfully" });
      } else {
        res.status(500).send({ error: "Failed to register" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

// router.post("/register", (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;
//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: "Please fill the empty fields" });
//   }

//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ Error: "User already exists" });
//       }
//       const user = new User({ name, email, phone, work, password, cpassword });
//       user.save().then(() => {
//         return res
//           .status(201)
//           .json({ message: "User Registered Successfully" });
//       });
//     })
//     .catch(() => res.status(500).json({ error: "Faild to register" }));
// });

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Plz fill the crediential" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      const token = await userLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      console.log(token);
      if (!isMatch) {
        res.status(422).json({ error: "Invalid " });
      } else {
        res.status(200).json({ message: "user login successfully" });
      }
    } else {
      res.status(422).json({ error: "Invalid crediential" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
