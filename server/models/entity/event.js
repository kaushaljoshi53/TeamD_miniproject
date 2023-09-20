module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('events', {
        event_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        event_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        event_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        start_time: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        end_time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        event_venue: {
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

    return Event;
}