require("dotenv").config({path:"../.env"});


async function geocode(location){
    let response=await fetch(`https://api.geoapify.com/v1/geocode/search?text=${location}&apiKey=${process.env.GEOAPIFY_API_KEY}`
    );
    let result = await response.json();
   
    return result.features[0].geometry.coordinates;
}
module.exports=geocode;
