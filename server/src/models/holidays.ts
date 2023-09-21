import { DataTypes, Model } from 'sequelize';
import { sequelizeObj } from '../database/dbConnect';

class Holiday extends Model {
  public id!: string;
  public title!: string;
  public image!: Buffer | null;
  public softDeleted!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Holiday.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.BLOB('long'),
      allowNull: true,
    },
    softDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: sequelizeObj,
    modelName: 'Holiday',
  }
);

export default Holiday;
