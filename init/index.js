const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const axios = require("axios");

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDB = async () => {
    await Listing.deleteMany({});
    console.log("Deleted old listings");

    for (let listing of initData.data) {
        try {
            console.log("Processing:", listing.location);

            const geoResponse = await axios.get(
                "https://nominatim.openstreetmap.org/search",
                {
                    params: {
                        q: listing.location,
                        format: "json",
                        limit: 1
                    },
                    headers: { "User-Agent": "wanderlust-app" }
                }
            );

            if (geoResponse.data.length > 0) {
                const lat = geoResponse.data[0].lat;
                const lon = geoResponse.data[0].lon;

                listing.geometry = {
                    type: "Point",
                    coordinates: [lon, lat]
                };
            }

            listing.owner = "697991f8790464f126670c4b";

            await Listing.create(listing);
            console.log("Inserted:", listing.title);

            await delay(1000);
        } catch (err) {
            console.log("Error for:", listing.location);
            console.log(err.message);
        }
    }

    console.log("DONE SEEDING");
};

main()
    .then(() => {
        console.log("Connected to DB");
        return initDB();
    })
    .then(() => {
        console.log("Seeding complete");
        mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });