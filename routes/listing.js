const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");

const listingController=require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js")
const upload = multer({ storage });



router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing)
);

//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);


//Search
router.get("/search",wrapAsync(async(req,res)=>{
    console.log(req.query);
    let {query}=req.query;
    let listings=await Listing.find({
        $or:[
            {title:{$regex:query, $options:"i"}},
            {location:{$regex:query, $options:"i"}},
            {country:{$regex:query, $options:"i"}},

        ]
    });
    console.log(listings);
    res.render("listings/search.ejs",{listings});
}));


router.route("/:id")
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing))
.get(wrapAsync(listingController.showListing));


//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm)

);



module.exports=router;
