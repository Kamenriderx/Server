const connection = require("../../config/connection");

const sendMail = require("../../utils/sendMail");
const { generateAuthToken } = require("../../utils/authToken");
const generateCode = require("../../utils/generateCode");
const { encrypt } = require("../../utils/handlePassword");

const getUsers = async (req, res, next) => {
  try {
    const users = await USER.findAll();
    res.status(200).json(users);
  } catch (error) {
    next(err);
  }
};
const restorePassword = async (req, res, next) => {
  try {
    const { CORREO, COD_VERIFICACION } = req.token;
    const { USER_PASSWORD } = req.body;
    console.log(CORREO,COD_VERIFICACION,USER_PASSWORD);
    const user = await connection.query(
      `SELECT * FROM TBL_USUARIOS WHERE CORREO = '${CORREO}'`
    );
    console.log(user[0]);

    if (user[0].COD_VERIFICACION == COD_VERIFICACION) {
      //const encriptedPassword = await encrypt(USER_PASSWORD);
      connection.query(
        `UPDATE TBL_USUARIOS SET CONTRASENA = '${USER_PASSWORD}' WHERE CORREO = '${CORREO}'`
      );
      res
        .status(200)
        .json({ message: "Contraseña restablecida correctamente" });
    } else {
      res
        .status(500)
        .json({ message: "No se ha podido reestablecer la contraseña " });
    }
  } catch (err) {
    next(err);
  }
};

const sendRestoreEmail = async (req, res) => {
  const { CORREO } = req.body;
  const VERIFICATION_CODE = generateCode();
  console.log(CORREO, "  ", VERIFICATION_CODE);
  try {
    const user = await connection.query(
      `SELECT * FROM TBL_USUARIOS WHERE COD_USUARIO = '${CORREO}'`
    );
    if (!user) {
      return res
        .status(404)
        .json({ message: "No exite un usuario con ese correo electronico" });
    }

    await connection.query(
      `UPDATE TBL_USUARIOS SET COD_VERIFICACION = '${VERIFICATION_CODE}' WHERE CORREO = '${CORREO}'`
    );

    const token = generateAuthToken(
      {
        CORREO,
        VERIFICATION_CODE,
      },
      "5m"
    );

    const options = {
      subject: "Recuperación de contraseña",
    };
    sendMail(CORREO, options, "resetPassword", { token })
      .then((response) => {
        res
          .status(200)
          .json({
            message: `Se ha enviado un correo de verificación a ${CORREO}`,
            data: response,
          });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  sendRestoreEmail,
  restorePassword,
};
