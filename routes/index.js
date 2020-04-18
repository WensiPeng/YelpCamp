var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");


// root route
router.get("/", function(req, res){
	res.render("landing");
})

//=================
//Auth routes
//=================

//show the register form
router.get("/register", function(req,res){
	res.render('register');
})

// sign up logic
router.post("/register", function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			return res.render("register", {"error": err.message});
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to YelpCamp" + user.username);
			res.redirect("/campgrounds");
		})
	});
})

//login
router.get("/login", function(req, res){
	res.render("login");
})

router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}), function(req, res){})

//logout
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Loggen you out!")
	res.redirect("/campgrounds");
})

//middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}
module.exports = router;