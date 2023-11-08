const express = require('express');
const router = express.Router()
const {addUser} = require("../controllers/registration");


const  authToken = require("../middlewares/authToken");

router.post("/addUser",addUser);


module.exports = router