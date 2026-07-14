import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  url: process.env.database_url,
  autoLoadEntities: true,
  synchronize: process.env.NODE_ENV !== 'production', // true for development/staging, false for production
  ssl: false,
}));
