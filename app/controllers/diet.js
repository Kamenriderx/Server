const connection = require("../../config/connection");
async function updateDiet(req, res) {
    const {limit,price} = req.body;
    connection
    .query("CALL ACTUALIZARPRECIODIETASALTASCALORIAS(:limit,:price)", {
      replacements: { limit, price}
    })
    .then((result) => {
        
      res.status(200).json({
        messaje:"Operación completada"
      });
    }).catch(error =>{
        res.status(500).json({
          error: "Error de conexión a la base de datos",
        });
    });

}
async function deletePricelessDiets(req, res) {
    connection
    .query("CALL GESTION_DIESTASSINPRECIO()", {
      replacements: {}
    })
    .then((result) => {
        
      res.status(200).json({
        messaje:"Operación completada"
      });
    }).catch(error =>{
        res.status(500).json({
          error: "Error de conexión a la base de datos",
        });
    });

}
async function getAverageCalories(req, res) {
    const {category} = req.body;
    connection
    .query("CALL OBTENERDIETASPROMEDIOCALORIAS(:category)", {
      replacements: {category}
    })
    .then((result) => {
        
      res.status(200).json({
        messaje:"Operación completada"
      });
    }).catch(error =>{
        res.status(500).json({
          error: "Error de conexión a la base de datos",
        });
    });

}


module.exports = {
  updateDiet,
  deletePricelessDiets,
  getAverageCalories
};
