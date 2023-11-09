const connection = require("../../config/connection");
const authToken = require("../../utils/authToken");
async function addUser(req, res) {
    const {name,password} = req.body;
    connection
    .query("CALL SP_LOGIN(:name,:password)", {
      replacements: { name, password}
    })
    .then((result) => {
        const token = authToken({
            name
        });
      res.status(200).json({
        token
      });
    }).catch(error =>{
        res.status(500).json({
          error: "Error de conexión a la base de datos",
        });
    });

}

module.exports = {
  addUser,
};
