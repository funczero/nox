export const logger = {
  info: (...args: any[]) => console.log('[INFO]', ...args),
  success: (...args: any[]) => console.log('[✅ SUCCESS]', ...args),
  warn: (...args: any[]) => console.warn('[⚠️ WARNING]', ...args),
  error: (...args: any[]) => console.error('[❌ ERROR]', ...args),
};
