const Listing = require("../models/listing");
const axios = require("axios");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            },
        })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing doesn't exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
    const geoResponse = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
            params: {
                q: req.body.listing.location,
                format: "json",
                limit: 1
            },
            headers: {
                "User-Agent": "wanderlust-app"
            }
        }
    );

    if (!geoResponse.data.length) {
        req.flash("error", "Invalid location");
        return res.redirect("/listings/new");
    }

    const lat = geoResponse.data[0].lat;
    const lon = geoResponse.data[0].lon;

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.geometry = {
        type: "Point",
        coordinates: [lon, lat]
    };

    //console.log(newListing.geometry);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    //await newListing.save();
    const savedListing = await newListing.save();
    //console.log("Saved Doc:", savedListing);
    req.flash("success", "New Listing Added!");
    res.redirect("/listings");
};

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing doesn't exist!");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_80,w_250,c_fill");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};


module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;

    let deletedListing = await Listing.findByIdAndDelete(id);

    if (deletedListing.image && deletedListing.image.filename) {
        const cloudinary = require("../cloudConfig");
        await cloudinary.uploader.destroy(deletedListing.image.filename);
    }

    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};