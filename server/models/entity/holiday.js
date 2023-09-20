module.exports = (sequelize, DataTypes) => {
    const HOLIDAY = sequelize.define('holiday', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.BLOB,
            allowNull: true,
        },
        softDeleted:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
            
    },{
        timestamps: false, // This disables createdAt and updatedAt fields
    });

    return HOLIDAY;
}