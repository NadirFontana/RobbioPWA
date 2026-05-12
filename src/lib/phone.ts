export function normalizePhone(phone: string): string | null {
  if (!phone) return null;

  // 1. Rimuovi tutti i caratteri non numerici tranne il +
  let p = phone.replace(/[\s\-().]/g, '').trim();

  // 2. Converte "00" iniziale in "+"
  if (p.startsWith('00')) {
    p = '+' + p.slice(2);
  }

  // 3. Se è un cellulare italiano senza prefisso (10 cifre, inizia con 3)
  if (/^3\d{9}$/.test(p)) {
    p = '+39' + p;
  }

  // 4. Validazione finale: deve essere + seguito da almeno 8 cifre, o solo cifre (almeno 8)
  if (!/^\+?\d{8,15}$/.test(p)) {
    return null;
  }

  return p;
}