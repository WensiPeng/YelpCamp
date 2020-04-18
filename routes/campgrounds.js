var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//INDEX - show all campgrounds
router.get("/", function(req, res){
	//get all campgrounds from db
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err)
		}
		else{
			res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
		}
	})
})

//NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
	res.render("campgrounds/new");
})

//CREATE - add a new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
	//get data from form and add to array
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var name = req.body.name;
	var image = req.body.image;
	var price = req.body.price;
	var desc = req.body.description;
	var newCampground = {
		name: name,
		image: image,
		description: desc,
		author:author,
		price: price
	}
	//create a new campground object and save to db
	Campground.create(newCampground, function(err, newCamp){
		if(err){
			console.log(err);
		}
		else{
			//redirect 
			res.redirect("/campgrounds");
		}
	})	
})

//SHOW
router.get("/:id", function(req, res){
	//find the campground id
			Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}
		else {
			res.render("campgrounds/show", {campground: foundCampground});
		}
	})
})

//EDIT campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){res.render("campgrounds/edit", {campground: foundCampground});})
})
						

//UPDATE campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
})

//DESTROY campground router
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			Campground.deleteMany({_id: {$in: this.comments}}, function(err){
				
			})
			res.redirect("/campgrounds");
		}
	})
})

// //middleware
// function isLoggedIn(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// }
	
// function checkCampgroundOwnership(req, res, next){
// 	if(req.isAuthenticated()){
// 		Campground.findById(req.params.id, function(err, foundCampground){
// 			if(err){
// 				console.log(err);
// 				res.redirect("back");
// 			}
// 			else{
// 				//does the user own the campground?
// 				// use equals since two have diff types
// 				if(foundCampground.author.id.equals(req.user._id)){
// 					next();
// 				}else{
// 					res.redirect("back");
// 				}	
// 			}
// 		}
// 	)
// 	}
// 	else{
// 		res.redirect("back");
// 	}
// }

module.exports = router;
