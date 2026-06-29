
const map = L.map('map').setView([listingCoordinates[1], listingCoordinates[0]],
    13);

L.tileLayer(
`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${mapToken}`,
{
    attribution: 'Geoapify'
}
).addTo(map);

L.marker([listingCoordinates[1], listingCoordinates[0]])
.addTo(map)
.bindPopup("Exact Location after booking")
.openPopup();

