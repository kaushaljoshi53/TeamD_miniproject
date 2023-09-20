var express = require('express');
var User = require("../models/controllers/user/user");
var Project = require("../models/controllers/project/project")
var Events = require("../models/controllers/event/event")
var Holiday = require("../models/controllers/holiday/holiday")
var router = express.Router();


///Use routes
//Signup
router.post("/",User.login);// for creating the user
router.post("/signin",User.create_user);// for creating the user
router.post("/signin",User.isLoggedIn);// for creating the user


//Project Allocation
router.post("/addproject",Project.add_project);
router.post("/userproject",Project.user_project);
router.post("/adminproject",Project.admin_project);
router.post("/updateproject",Project.update_project);


//Events
router.post("/addevent",Events.add_event);
router.post("/updateevent",Events.update_event);
router.post("/getevent",Events.get_event);


//Holidays

router.post("/addholiday",Holiday.add_holiday);
router.post("/getholiday",Holiday.get_holiday);



module.exports = router;