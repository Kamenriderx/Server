const express = require('express');
const router = express.Router()
const {login,addUser,getUser} = require("../controllers/registration");


const  authToken = require("../middlewares/authToken");

router.post("/login",login);
router.post("/addUser",authToken,addUser);
router.get("/getUsers",authToken,getUser);


module.exports = router