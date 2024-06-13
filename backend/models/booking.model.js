import { DataTypes }  from'sequelize';
import sequelize  from'../db/init.js';
import User  from'./user.model.js';
import Vehicle  from'./vehicle.model.js';

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  vehicleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Vehicle,
      key: 'id',
    },
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

User.hasMany(Booking, { foreignKey: 'userId' });
Vehicle.hasMany(Booking, { foreignKey: 'vehicleId' });
Booking.belongsTo(User, { foreignKey: 'userId' });
Booking.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

export default Booking;