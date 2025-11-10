import { neon, neonConfig } from '@neondatabase/serverless';

neonConfig.fetchConnectionCache = true;

let _sql: ReturnType<typeof neon> | null = null;

export function getDb() {
  if (_sql) return _sql;
  
  const connectionString = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
  
  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined');
  }
  
  _sql = neon(connectionString);
  return _sql;
}

// Export per compatibilità
export const sql = getDb();