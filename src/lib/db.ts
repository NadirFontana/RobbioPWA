import { neon, neonConfig } from '@neondatabase/serverless';

// Aumenta il timeout
neonConfig.fetchConnectionCache = true;

export const sql = neon(process.env.DATABASE_URL!);