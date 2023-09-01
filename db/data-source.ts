import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

export const dataSourceOptions: DataSourceOptions = {
  name: 'default',
  type: process.env['DB_TYPE'] as any,
  host: process.env['DB_HOST'] as any,
  port: process.env['DB_PORT'] as any,
  username: process.env['DB_USER'] as any,
  password: process.env['DB_PASS'] as any,
  database: process.env['DB_NAME'] as any,
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
