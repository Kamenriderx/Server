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
  const { codRol,userName,password,email } = req.body;
  console.log(codRol,userName,password,email);
  try {
    connection
      .query(
        `INSERT INTO TBL_USUARIOS(COD_ROL,NOM_USUARIO,CONTRASENA,CORREO) VALUES(:codRol,:userName,:password,:email) `,
        { replacements: { codRol,userName,password,email } }
      )
      .then((ress) => {
        console.log(ress);
        res.status(200).json({ message: "Usuario agregado" });
      });
  } catch (e) {
    res.status(400).json({ message: "Error" });
  }
}


const getUser = async (req, res) => {
  try{
    let data = [];
    connection.query(`SELECT * FROM TBL_USUARIOS WHERE NOM_USUARIO != 'admin'`).then(ress=>{
      
       data = ress[0].map(user=>{return{
        cod_usuario:user.COD_USUARIO,
        nom_usuario:user.NOM_USUARIO,
        contrasena:user.CONTRASENA,
        fec_registro:(user.FEC_REGISTRO),
        email:user.CORREO
      }});
      res.status(200).json({data});
    })
  }catch(e){
    res.status(400).json({message:"Error"});
  }
};



module.exports = {
  login,
  addUser,
  getUser
};
