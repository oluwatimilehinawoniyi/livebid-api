import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  username: process.env.DATABASE_USER || 'livebid',
  password: process.env.DATABASE_PASSWORD || 'livebid123',
  port: 5432,
  database: 'auth_db',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
});
