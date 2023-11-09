const express = require('express');
const router = express.Router()
const { updateDiet,deletePricelessDiets,getAverageCalories } = require('../controllers/diet');
const  authToken = require("../middlewares/authToken");



router.put("/actualizarDieta",updateDiet);
router.delete("/borrarDietaSinPrecio",deletePricelessDiets);
router.post("/obtenerCaloriasPromedio",getAverageCalories);


module.exports = router