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

module.exports  = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  'Mas##45new',
  {
    host: process.env.HOST,
    dialect: "mysql",
    ...sequelizeOptions,
  }
);