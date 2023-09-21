import { DataTypes, Model, Sequelize } from 'sequelize';
import { sequelizeObj } from '../database/dbConnect';

class Event extends Model {
  public eventName!: string;
  public eventDate!: string;
  public startTime!: string;
  public endTime!: string | null;
  public eventVenue!: string;
  public eventOrganiser!: string;
  public softDeleted!: boolean;
}

// Initialize the Event model with its attributes and configuration
Event.init(
  {
    
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    eventVenue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventOrganiser: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    softDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: sequelizeObj,
    modelName: 'Event',
  }
);

export default Event;
