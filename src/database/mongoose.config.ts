import { MongooseModuleOptions } from '@nestjs/mongoose';

export const mongooseConfig = (): MongooseModuleOptions => {
  // retrive data from env file
  const uri = process.env.DATABASE_URI;
  const dbName = process.env.DATABASE_NAME;
  const user = process.env.DATABASE_USER;
  const pass = process.env.DATABASE_PASS;

  if (!uri || !dbName || !user || !pass) {
    throw new Error(
      'DATABASE_URI and DATABASE_NAME must be defined in environment variables',
    );
  }

  const config: MongooseModuleOptions = {
    uri, // connection string
    dbName, // database name
    auth: {
      username: user, // username
      password: pass, // password
    },
    maxPoolSize: 10, // max number of connections
    minPoolSize: 2, // minimum number of connections
    serverSelectionTimeoutMS: 5000, // timeout for server selection
    socketTimeoutMS: 45000, // timeout for socket operations
    family: 4, // use IPv4
  };

  return config;
};
