module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('project_allocation', {
        project_id: {
            type: DataTypes.STRING,
        },
        project_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        team_leader: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        emp_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        softDeleted:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
            
    },{
        timestamps: false, // This disables createdAt and updatedAt fields
    });

    return Project;
}