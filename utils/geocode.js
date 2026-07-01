require("dotenv").config({path:"../.env"});


async function geocode(location) {
  try {
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(location)}&apiKey=${process.env.GEOAPIFY_API_KEY}`;

    let response = await fetch(url);
    let result = await response.json();

    console.log("Geoapify response:", result);

    if (!result.features?.length) {
      return null; // safer for app
    }

    return result.features[0].geometry.coordinates;
  } catch (err) {
    console.error("Geocode error:", err.message);
    return null;
  }
}

module.exports = geocode;