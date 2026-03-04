const mapDiv = document.getElementById("map");

const listingData = JSON.parse(mapDiv.dataset.listing);

if (listingData.coords) {

    const map = L.map("map").setView(
        [listingData.coords[1], listingData.coords[0]],
        10
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors"
    }).addTo(map);

    const popupContent = `
    <div>
    <strong>${listingData.location}, ${listingData.country}</strong>
    <br>
    <span style="color: gray;">Exact location provided after booking</span>
    </div>
`;

    L.marker([listingData.coords[1], listingData.coords[0]])
        .addTo(map)
        .bindPopup(popupContent)
        .openPopup();
}