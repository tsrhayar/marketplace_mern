const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const Todo = require("../models/Todo");

//  sign token
const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "TahaSrhayarSecret",
      sub: userID,
    },
    "TahaSrhayarSecret",
    { expiresIn: "12h" }
  );
};

// registre
userRouter.post("/registre", (req, res) => {
  const { username, password, role, adress, cin } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
    if (user)
      res.status(400).json({ message: { msgBody: "Username is already taken", msgError: true } });
    else {
      const newUser = new User({ username, password, role, adress, cin });
      newUser.save((err) => {
        if (err)
          res.status(500).json({ message: { msgBody: "Error has occured", msgError: true, err } });
        else
          res
            .status(201)
            .json({ message: { msgBody: "Account successfully created", msgError: false } });
      });
    }
  });
});

// add admin
userRouter.post("/addadmin", passport.authenticate("jwt", { session: false }), (req, res) => {
  if (req.user.role === "superadmin") {
    const { username, password, role } = req.body;
    User.findOne({ username }, (err, user) => {
      if (err) res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
      if (user)
        res.status(400).json({ message: { msgBody: "Username is already taken", msgError: true } });
      else {
        const newUser = new User({ username, password, role: "admin" });
        newUser.save((err) => {
          if (err)
            res
              .status(500)
              .json({ message: { msgBody: "Error has occured", msgError: true, err } });
          else
            res
              .status(201)
              .json({ message: { msgBody: "Account successfully created", msgError: false } });
        });
      }
    });
  }
});

// block admin
userRouter.post("/blockadmin/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  if (req.user.role === "superadmin") {
    User.findByIdAndUpdate(req.params.id, { isActive: 0 }, (err, result) => {
      if (err)
        return res
          .status(500)
          .send({ message: { msgBody: "Error has occured", msgError: true, err } });
      return res
        .status(200)
        .send({ message: { msgBody: "Account successfully blocked", msgError: false } });
    });
  }
});

userRouter.post(
  "/activeadmin/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "superadmin") {
      User.findByIdAndUpdate(req.params.id, { isActive: 1 }, (err, result) => {
        if (err)
          return res
            .status(500)
            .send({ message: { msgBody: "Error has occured", msgError: true, err } });
        return res
          .status(200)
          .send({ message: { msgBody: "Account successfully actived", msgError: false } });
      });
    }
  }
);

userRouter.post(
  "/deleteadmin/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "superadmin") {
      User.findByIdAndDelete(req.params.id, (err, result) => {
        if (err)
          return res
            .status(500)
            .send({ message: { msgBody: "Error has occured", msgError: true, err } });
        return res
          .status(200)
          .send({ message: { msgBody: "Account successfully deleted", msgError: false } });
      });
    }
  }
);

// login
userRouter.post("/login", passport.authenticate("local", { session: false }), (req, res) => {
  if (req.isAuthenticated()) {
    const { _id, username, role, isActive } = req.user;
    const token = signToken(_id);
    if (isActive) {
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { username, role } });
    } else {
      res.json({ message: { msgBody: "You are not active", msgError: true } });
    }
  }
});

// logout
userRouter.get("/logout", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.clearCookie("access_token");
  res.json({ user: { username: "", role: "" }, success: true });
});

// get admins
userRouter.get("/admins", passport.authenticate("jwt", { session: false }), (req, res) => {
  if (req.user.role === "superadmin") {
    User.find({ role: "admin" }).exec((err, document) => {
      if (err) res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
      else res.status(200).json({ admins: document, authenticated: true });
    });
  } else
    res.status(403).json({ message: { msgBody: "You're not an admin,go away", msgError: true } });
});

// if admin
userRouter.get("/admin", passport.authenticate("jwt", { session: false }), (req, res) => {
  if (req.user.role === "admin") {
    res.status(200).json({ message: { msgBody: "You are an admin", msgError: false } });
  } else
    res.status(403).json({ message: { msgBody: "You're not an admin,go away", msgError: true } });
});

// if authentifier
userRouter.get("/authenticated", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { username, role } = req.user;
  res.status(200).json({ isAuthenticated: true, user: { username, role } });
});

module.exports = userRouter;
