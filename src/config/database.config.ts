import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  url: process.env.database_url,
  autoLoadEntities: true,
  synchronize: process.env.NODE_ENV !== 'production', // true for development/staging, false for production
  ssl: false,
  
  // --- Industry Standard Connection Handling ---
  retryAttempts: 3, // Number of times to retry connecting on startup before failing
  retryDelay: 3000, // Delay between connection retries (in ms)
  
  // Underlying PostgreSQL driver (pg) connection pool options
  extra: {
    connectionTimeoutMillis: 5000, // Fail fast: Timeout if connection to DB takes longer than 5 seconds
    max: 10, // Maximum number of concurrent connections in the pool
  }
}));
