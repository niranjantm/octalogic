import sequelize from '../db/init.js';
import User from '../models/user.model.js';
import Vehicle from '../models/vehicle.model.js';

const seed = async () => {
  await sequelize.sync({ force: true });

  // Add vehicle types and vehicles
  const vehicles = [
    { typeOfWheels: 'fourWheels', vehicleType: 'hatchback', vehicleName: 'Swift' },
    { typeOfWheels: 'fourWheels', vehicleType: 'suv', vehicleName: 'XUV 700' },
    { typeOfWheels: 'fourWheels', vehicleType: 'sedan', vehicleName: 'Verna' },
    { typeOfWheels: 'twoWheels', vehicleType: 'cruiser', vehicleName: 'Bullet' },
    { typeOfWheels: 'twoWheels', vehicleType: 'sports', vehicleName: 'Pulsar' },
  ];

  for (const vehicle of vehicles) {
    await Vehicle.create(vehicle);
  }

  console.log('Database seeded!');
  process.exit();
};

seed();
