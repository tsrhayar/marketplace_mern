const express = require("express");
const productRouter = express.Router();
const passport = require("passport");
const Product = require("../models/Product");
const path = require("path");

// create by seller
productRouter.post("/add", passport.authenticate("jwt", { session: false }), (req, res) => {
  if (true) {
    const { name, description, image, price, category } = req.body;

    const product = new Product({
      name,
      description,
      image: path.parse(image).base,
      price,
      category,
      seller: req.user._id,
    });

    product.save((err) => {
      if (err) {
        res.status(500).json({ message: { msgBody: "Error has occured1", msgError: true } });
        console.log(err);
      } else {
        product.save((err) => {
          if (err)
            res.status(500).json({ message: { msgBody: "Error has occured2", msgError: true } });
          else
            res
              .status(200)
              .json({ message: { msgBody: "Successfully created product", msgError: false } });
        });
      }
    });
  } else {
    res.status(401).json({ message: { msgBody: "not authorized to add", msgError: true } });
  }
});

// get all product of categorie
productRouter.get("/c", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { category } = req.body;
  console.log("d", req.user);
  Product.find({ category })
    .populate("category")
    .exec((err, document) => {
      if (err) res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
      else res.status(200).json({ category: document, authenticated: true });
    });
});

// get all product
productRouter.get("/", (req, res) => {
  Product.find().exec((err, document) => {
    if (err) res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
    else res.status(200).json({ products: document, authenticated: true });
  });
});

productRouter.get("/bypricelth", (req, res) => {
  Product.find()
    .sort({ price: 1 })
    .exec((err, document) => {
      if (err) res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
      else res.status(200).json({ products: document, authenticated: true });
    });
});

productRouter.get("/bypricehtl", (req, res) => {
  Product.find()
    .sort({ price: -1 })
    .exec((err, document) => {
      if (err) res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
      else res.status(200).json({ products: document, authenticated: true });
    });
});

module.exports = productRouter;
