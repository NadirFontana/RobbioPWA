import { neon, neonConfig } from '@neondatabase/serverless';

neonConfig.fetchConnectionCache = true;

let _sql: ReturnType<typeof neon> | null = null;

export function getDb() {
  if (_sql) return _sql;
  
  const connectionString = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
  
  // Durante il build, restituisce null invece di lanciare errore
  if (!connectionString) {
    console.warn('DATABASE_URL is not defined');
    return null as any; // Restituisce null ma TypeScript lo tratta come valido
  }
  
  _sql = neon(connectionString);
  return _sql;
}

// Export per compatibilità
export const sql = getDb();