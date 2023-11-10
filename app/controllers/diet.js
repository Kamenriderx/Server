const connection = require("../../config/connection");
async function dietManagement(req, res) {
  const {
    mode,
    codDiet,
    dietTitle,
    dietDescription,
    dietIngredients,
    dietCategory,
    dietDirection,
    dietCalories,
    dietCarbohydrates,
    dietProteins,
    dietFat,
    timeDiet,
    dietPortions,
    dietIndex,
    dietPrice,
    dietImage,
  } = req.body;
  try {
    const ress = await connection.query(
      `CALL GESTION_DE_VENTA(:mode, :codDiet, :dietTitle, :dietDescription, :dietIngredients,:dietCategory,:dietDirection,:dietCalories, :dietCarbohydrates,:dietProteins, :dietFat, :timeDiet, :dietPortions,:dietIndex,:dietPrice,:dietImage)`,
      {
        replacements: {
          mode,
          codDiet,
          dietTitle,
          dietDescription,
          dietIngredients,
          dietCategory,
          dietDirection,
          dietCalories,
          dietCarbohydrates,
          dietProteins,
          dietFat,
          timeDiet,
          dietPortions,
          dietIndex,
          dietPrice,
          dietImage,
        },
      }
    );

    res.status(400).json({ message: "Operacion completada" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Error" });
  }
}

module.exports = {
  dietManagement,
};
