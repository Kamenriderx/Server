const express = require('express');
const router = express.Router()
const {login,addUser} = require("../controllers/registration");


const  authToken = require("../middlewares/authToken");

router.post("/login",login);
router.post("/addUser",authToken,addUser);


module.exports = router