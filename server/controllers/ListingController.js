const Listing =
require("../models/Listing");

const createListing =
async (req,res)=>{

try{

const {

title,
qualifications,
description,
employerInfo,
price,
isContract,
userEmail

}=req.body;

const image =
req.file
? `/uploads/${req.file.filename}`
: "";

const contractValue =
isContract===true ||
isContract==="true";

const listing =
await Listing.create({

title,

qualifications,

description,

employerInfo,

price:
contractValue
? 0
: price,

isContract:
contractValue,

image,

userEmail,

userId:
req.user.id

});

res.status(201)
.json(listing);

}

catch(error){

console.log(error);

res.status(500).json({

message:error.message

});

}

};

const getListings =
async (req,res)=>{

try{

const {

sort,
search

}=req.query;

let sortOption={

createdAt:-1

};

if(sort==="old"){

sortOption={
createdAt:1
};

}

if(sort==="salary-high"){

sortOption={
price:-1
};

}

if(sort==="salary-low"){

sortOption={
price:1
};

}

let filter={

approved:true

};

if(
search &&
search.trim()!==""
){

filter.$or=[

{
title:{
$regex:search,
$options:"i"
}
},

{
description:{
$regex:search,
$options:"i"
}
},

{
qualifications:{
$regex:search,
$options:"i"
}
},

{
employerInfo:{
$regex:search,
$options:"i"
}
}

];

}

const listings =
await Listing.find(filter)
.sort(sortOption);

res.json(listings);

}

catch(error){

res.status(500).json({

message:error.message

});

}

};

const approveListing =
async(req,res)=>{

try{

const listing=
await Listing.findByIdAndUpdate(

req.params.id,

{
approved:true
},

{
new:true
}

);

if(!listing){

return res.status(404)
.json({

message:
"Not found"

});

}

res.json({

message:"Approved",

listing

});

}

catch(error){

res.status(500).json({

message:error.message

});

}

};

const deleteListing =
async(req,res)=>{

try{

await Listing.findByIdAndDelete(
req.params.id
);

res.json({

message:"Deleted"

});

}

catch(error){

res.status(500).json({

message:error.message

});

}

};

const getAllListings =
async(req,res)=>{

try{

const listings=
await Listing.find()
.sort({

createdAt:-1

});

res.json(listings);

}

catch(error){

res.status(500).json({

message:error.message

});

}

};

const getSingleListing =
async(req,res)=>{

try{

const listing=
await Listing.findById(
req.params.id
);

res.json(listing);

}

catch(error){

res.status(500).json({

message:error.message

});

}

};

const getMyListings =
async(req,res)=>{

try{

const listings=
await Listing.find({

userId:req.user.id

}).sort({

createdAt:-1

});

res.json(listings);

}

catch(error){

res.status(500).json({

message:error.message

});

}

};

const updateListing =
async(req,res)=>{

try{

const listing=
await Listing.findById(
req.params.id
);

if(!listing){

return res.status(404)
.json({

message:"Not found"

});

}

if(
listing.userId.toString()
!==req.user.id
){

return res.status(403)
.json({

message:"Forbidden"

});

}

const contractValue=
req.body.isContract===true ||
req.body.isContract==="true";

listing.title=
req.body.title;

listing.description=
req.body.description;

listing.qualifications=
req.body.qualifications;

listing.employerInfo=
req.body.employerInfo;

listing.isContract=
contractValue;

listing.price=
contractValue
? 0
: req.body.price;

await listing.save();

res.json(listing);

}

catch(error){

res.status(500).json({

message:error.message

});

}

};

const removeListing =
async(req,res)=>{

try{

const listing=
await Listing.findById(
req.params.id
);

if(!listing){

return res.status(404)
.json({

message:"Not found"

});

}

if(
listing.userId.toString()
!==req.user.id
){

return res.status(403)
.json({

message:"Forbidden"

});

}

await listing.deleteOne();

res.json({

message:"Deleted"

});

}

catch(error){

res.status(500).json({

message:error.message

});

}

};

module.exports={

createListing,

getListings,

approveListing,

deleteListing,

getAllListings,

getSingleListing,

getMyListings,

updateListing,

removeListing

};