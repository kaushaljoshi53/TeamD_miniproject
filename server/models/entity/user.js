module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('emp_details', {
        emp_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
        },
        designation: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Intern',
        },
        dob: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.BLOB,
            allowNull: true,
        },
        isadmin: {
            type: DataTypes.BOOLEAN,
            defaultValue:false,
        },
        softDeleted:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
            
    },{
        timestamps: false, // This disables createdAt and updatedAt fields
    });

    return User;
}