const connection = require("../../config/connection");

function addUser(req, res) {
  connection
    .query('CALL SP_LOGIN(:name,:password)', {
      replacements: { name: req.body.name, password: req.body.password },
    })
    .then((result) => {
      res.status(200).json({
        response: result,
      });
    }).catch(error =>{
        res.status(400).json({
          error: error,
        });
    });
  console.log(req.body.name,req.body.password );
}

module.exports = {
  addUser,
};
