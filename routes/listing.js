const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router
  .route("/")
  .get(listingController.index) //Index Route
  // .post(
  //   isLoggedIn,
  //   validateListing,
  //   wrapAsync(listingController.createListing)
  // );
  .post(upload.single('listing[image]'),(req,res)=>{
    res.send(req.file);
  })

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(listingController.showListing)
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, listingController.deleteListing);

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, listingController.renderEditForm);

module.exports = router;
