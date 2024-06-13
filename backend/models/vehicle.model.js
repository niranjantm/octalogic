import { DataTypes } from 'sequelize';
import sequelize from '../db/init.js';

const Vehicle = sequelize.define('Vehicle', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  typeOfWheels: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicleType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicleName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Vehicle;