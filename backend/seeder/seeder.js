import sequelize from '../db/init.js';
import User from '../models/user.model.js';
import Vehicle from '../models/vehicle.model.js';

const seed = async () => {
  await sequelize.sync({ force: true });

  const vehicles = [
    { typeOfWheels: 'Four Wheels', vehicleType: 'hatchback', vehicleName: 'Swift' },
    { typeOfWheels: 'Four Wheels', vehicleType: 'suv', vehicleName: 'XUV 700' },
    { typeOfWheels: 'Four Wheels', vehicleType: 'sedan', vehicleName: 'Verna' },
    { typeOfWheels: 'Two Wheels', vehicleType: 'cruiser', vehicleName: 'Bullet' },
    { typeOfWheels: 'Two Wheels', vehicleType: 'sports', vehicleName: 'Pulsar' },
  ];

  for (const vehicle of vehicles) {
    await Vehicle.create(vehicle);
  }

  console.log('Database seeded!');
  process.exit();
};

seed();
