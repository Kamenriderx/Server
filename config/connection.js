const dotenv = require("dotenv");
const { createLogger, format, transports } = require("winston");
const { Sequelize } = require("sequelize") ; 
dotenv.config();

const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ level, message }) => {
          return `${level}: ${message}`;
        })
      ),
    }),
  ],
});

const sequelizeOptions = {
  logging: false,
};

const connection = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    'Mas##45new',
    {
      host: "142.44.161.115",
      dialect: "mysql",
      ...sequelizeOptions,
    }
  );

connection
  .authenticate()
  .then(() => {
    logger.info("Conexión a la base de datos establecida con éxito.");
  })
  .catch((error) => {
    logger.error("Error al intentar conectar a la base de datos:", error);
  });

module.exports  = connection;

