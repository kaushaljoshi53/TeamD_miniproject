const { Sequelize, DataTypes } = require("sequelize");
const sql = require("mysql2/promise")

sql.
    createConnection({ user:"root", password: "Vivek@17sql" })
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
db.USER=require("../models/entity/user")(sequelize,DataTypes)
db.PROJECT=require("../models/entity/project.js")(sequelize,DataTypes)
db.EVENT=require("../models/entity/event.js")(sequelize,DataTypes)
db.HOLIDAY=require("../models/entity/holiday.js")(sequelize,DataTypes)



db.sequelize.sync({ force: false }, () => {

    console.log("Sync done");
  
  });
  



module.exports = db;