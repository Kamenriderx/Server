const connection = require("../../config/connection");

//Modulos corregidos

async function selectSecurity(req, res) {
  try {
    const { PV_OPCION } = req.body;
    const ress = await connection.query(`CALL SEL_SEG(:PV_OPCION)`, {
      replacements: {
        PV_OPCION,
      },
    });

    res.status(200).json(results[0]);
  } catch (e) {
    res.status(500).send({ message: "Algo salio mal" });
  }
}



//GET
//SELECCIONAR MODULO SEGURIDAD
app.get("/SEL_SEG", (req, res) => {
  try {
    const { PV_OPCION } = req.body;

    const consulta = `CALL SEL_SEG('${PV_OPCION}')`;
    mysqlConnection.query(consulta, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.send(error);
      }
    });
  } catch (error) {
    res.send(error);
  }
});

//POST
// Registrar Seguridad
app.post("/reg_SEGURIDAD", (req, res) => {
  try {
    const {
      PV_ACCION,
      NOM_ROL,
      DES_ROL,
      NOM_OBJETO,
      DES_OBJETO,
      TIP_OBJETO,
      LEER,
      ESCRIBIR,
      ACTUALIZAR,
      BORRAR,
      PREGUNTA,
      RESPUESTA,
      PARAMETRO,
      VALOR,
      ESTADO,
      CONTRASENA,
    } = req.body;
    const consulta = `CALL ING_SEG('${PV_ACCION}','${NOM_ROL}','${DES_ROL}','${NOM_OBJETO}','${DES_OBJETO}','${TIP_OBJETO}','${LEER}','${ESCRIBIR}','${ACTUALIZAR}','${BORRAR}','${PREGUNTA}','${RESPUESTA}','${PARAMETRO}','${VALOR}','${ESTADO}','${CONTRASENA}')`;
    mysqlConnection.query(consulta, (error) => {
      if (!error) {
        res.json({
          Status: "Registrado exitosamente",
        });
      } else {
        console.log(error);
      }
    });
  } catch (error) {
    res.send(error);
  }
});

//PUT
// ACTUALIZAR SEGURIDAD
app.put("/act_SEGURIDAD", (req, res) => {
  try {
    const {
      COD_USRCLI,
      ID_PERSONA,
      NOM_PERSONA,
      SEX_PERSONA,
      IND_CIVIL,
      EDA_PERSONA,
      TIP_PERSONA,
      NOM_PAIS,
      NOM_DEPARTAMENTO,
      NOM_CIUDAD,
      NOM_COLONIA,
      NOM_CALLE,
      NUM_TELEFONO,
      TIP_TELEFONO,
      NOM_CORREO,
      TIP_CORREO,
      CONTRASENA,
    } = req.body;
    const consulta = `CALL UPD_INF_USUARIO('${COD_USRCLI}','${ID_PERSONA}','${NOM_PERSONA}','${SEX_PERSONA}','${IND_CIVIL}','${EDA_PERSONA}','${TIP_PERSONA}','${NOM_PAIS}','${NOM_DEPARTAMENTO}','${NOM_CIUDAD}','${NOM_COLONIA}','${NOM_CALLE}','${NUM_TELEFONO}','${TIP_TELEFONO}','${NOM_CORREO}','${TIP_CORREO}','${CONTRASENA}')`;
    mysqlConnection.query(consulta, (error) => {
      if (!error) {
        res.json({
          Status: "Actualizado exitosamente",
        });
      } else {
        console.log(error);
      }
    });
  } catch (error) {
    res.send(error);
  }
});
