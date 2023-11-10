const connection = require("../../config/connection");
const {generateAuthToken} = require("../../utils/authToken");

async function login(req, res) {
  const { name, password } = req.body;
  console.log(name, password);

  try {
    const ress = await connection.query(`SELECT * FROM TBL_USUARIOS WHERE NOM_USUARIO = '${name}'`);

    const user = ress[0][0];

    if (user) {
      console.log(user);

      if (user.CONTRASENA === password) {
        const token = generateAuthToken(user);
        return res.status(200).json({ token });
      } else {
        return res.status(400).json({ message: "Contraseña incorrecta" });
      }
    } else {
      return res.status(400).json({ message: "No existe un usuario con ese nombre" });
    }
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: "Error" });
  }
}

async function addUser(req, res) {
  const { action, codUser, codRol, userName, password } = req.body;
  console.log(action, codUser, codRol, userName, password);
  try {
    connection
      .query(
        `CALL GESTION_USUARIOS(:action,:codUser,:codRol,:userName,:password,@PV_result)`,
        { replacements: { action, codUser, codRol, userName, password } }
      )
      .then((ress) => {
        console.log(ress);
        res.status(200).json({ message: "Usuario agregado" });
      });
  } catch (e) {
    res.status(400).json({ message: "Error" });
  }
}

module.exports = {
  login,
  addUser,
};
