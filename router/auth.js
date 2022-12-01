const express = require("express");
const router = express.Router();
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
    }

    const user = new User({ name, email, phone, work, password, cpassword });
    const userRegister = await user.save();

    if (userRegister) {
      res.status(201).json({ message: "User Register successfully" });
    } else {
      res.status(500).send({ error: "Failed to register" });
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

module.exports = router;
