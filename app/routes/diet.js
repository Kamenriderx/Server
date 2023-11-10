const express = require('express');
const router = express.Router()
const { dietManagement } = require('../controllers/diet');
const  authToken = require("../middlewares/authToken");



router.post("/gestionDiesta",authToken,dietManagement);


module.exports = router