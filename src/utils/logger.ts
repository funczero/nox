export const logger = {
  info: (...args: unknown[]) => console.log('[INFO]', ...args),
  success: (...args: unknown[]) => console.log('[✅ SUCCESS]', ...args),
  warn: (...args: unknown[]) => console.warn('[⚠️ WARNING]', ...args),
  error: (...args: unknown[]) => console.error('[❌ ERROR]', ...args),
};