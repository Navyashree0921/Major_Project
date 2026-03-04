const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const reviewController = require("../controllers/reviews");
const { isLoggedIn } = require("../middleware");

router.post("/", isLoggedIn, wrapAsync(reviewController.createReview));

router.delete("/:reviewId", isLoggedIn, wrapAsync(reviewController.deleteReview));

module.exports = router;