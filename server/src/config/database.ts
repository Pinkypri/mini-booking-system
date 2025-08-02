import { DataSource } from 'typeorm';
import env from './env';
import { User } from '../models/User';
import { Slot } from '../models/Slot';
import { Booking } from '../models/Booking';

const AppDataSource = new DataSource({

  type: "postgres",
  url: env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required by Render
  },
  synchronize: true, // Turn off in production
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: [],
  subscribers: [],
});
export default AppDataSource;
