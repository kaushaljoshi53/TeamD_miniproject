import sql from 'mysql2';
import dotenv from 'dotenv';
import path from 'path';
import { Sequelize } from 'sequelize';

dotenv.config();

// dotenv.config();

const sequelizeObj = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST, // MySQL host
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});


export default sequelizeObj;





