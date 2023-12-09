const express = require('express');
const router = express.Router()
const { getProducts } = require('../controllers/product');
const  authToken = require("../middlewares/authToken");



router.get("/getProducts",authToken,getProducts);


module.exports = router;