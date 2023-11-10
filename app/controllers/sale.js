
const connection = require("../../config/connection");
async function salesManagement(req, res) {
    const { action,codsale,codProduct,codTrainer,quantity,subTotal} = req.body;
    try {
        const ress = await connection.query(
          `CALL GESTION_DE_VENTA(:action,:codsale,:codProduct,:codTrainer,:quantity,:subTotal)`,
          { replacements: { action,codsale,codProduct,codTrainer,quantity,subTotal } }
        )

        res.status(400).json({ message: "Operacion completada" });
        
    } catch (e) {
        console.log(e);
      res.status(400).json({ message: "Error" });
    }
  }


module.exports = {
    salesManagement
}