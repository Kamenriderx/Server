const express = require('express');
const router = express.Router()
const  authToken = require("../middlewares/authToken");
const {salesManagement} = require("../controllers/sale");



router.post("/gestionVenta",authToken,salesManagement);


module.exports = router