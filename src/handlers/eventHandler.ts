import { Client } from 'discord.js';
import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { logger } from '../utils/logger';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface Event {
  name: string;
  once?: boolean;
  execute: (...args: any[]) => void;
}

export const handleEvents = async (client: Client): Promise<void> => {
  const eventsPath = join(__dirname, '../events');
  const files = readdirSync(eventsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

  for (const file of files) {
    const filePath = join(eventsPath, file);

    try {
      const { default: event }: { default: Event } = await import(pathToFileURL(filePath).toString());

      if (!event?.name || typeof event.execute !== 'function') {
        logger.warn(`❌ Estrutura inválida no evento: ${file}`);
        continue;
      }

      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args));
      }

      logger.success(`Evento carregado: ${event.name}`);
    } catch (err) {
      logger.error(`Erro ao carregar o evento ${file}:`, err);
    }
  }
};
