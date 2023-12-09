const connection = require("../../config/connection");

const getProducts = async (req, res) => {
    try{
      let data = [];
      connection.query(`SELECT * FROM TBL_PRODUCTOS`).then(ress=>{
         data = ress[0].map(product=>{return{
          cod_producto:product.COD_PRODUCTO,
          nom_producto:product.NOM_PRODUCTO,
          des_producto:product.DES_PRODUCTO,
          cod_tipo_producto:(product.COD_TIPO_PRODUCTO),
          imagen_producto:product.IMAGEN_PRODUCTO,
          precio_producto:product.PRECIO_PRODUCTO,
          ind_producto:product.IND_PRODUCTO,
          enlace_producto:product.ENLACE_PRODUCTO,
          fecha_registro:product.FEC_REGISTRO,
          estado:product.ESTADO,

        }});
        res.status(200).json({data});
      })
    }catch(e){
      res.status(400).json({message:"Error"});
    }
  };


  module.exports={
    getProducts
  }
  