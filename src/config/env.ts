import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  TOKEN: z.string().min(1, 'O TOKEN do bot é obrigatório.'),
  CLIENT_ID: z.string().min(1, 'O CLIENT_ID é obrigatório.'),
  GUILD_ID: z.string().min(1, 'O GUILD_ID é obrigatório.')
});

export const validateEnv = () => {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error('Variáveis de ambiente inválidas:');
    console.error(parsed.error.format());
    process.exit(1);
  }
};
