const { Sequelize, DataTypes } = require("sequelize");
const doenv = require("dotenv");
const db_config = require("../config/.env")
const sql = require("mysql2/promise")
const doenv = require("dotenv");

// doenv.config
//     path:'../config/.env'
// })

// const db = mysql.createConnection({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASS,
//     database: process.env.DATABASE,
//     dialect:process.env.DATABASE_DIALECT,
// });

sql.
    createConnection({ user: db_config.process.env.DATABASE_USER, password: db_config.process.env.DATABASE_PASS })
    .then(()=>
    {
        console.log("db CONNECTED successfully")
    })




const sequelize = new Sequelize(
    "jin",
    "root",
    "Vivek@17sql",    {
    host:"localhost",
    dialect: "mysql",
});

const db={}
db.sequelize=sequelize
db.USER=require("./Entity/user.js")(sequelize,DataTypes)


db.sequelize.sync({ force: false }, () => {

    console.log("Sync done");
  
  });
  



module.exports = db;