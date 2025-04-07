import { Client, GatewayIntentBits, Partials, Collection } from 'discord.js';
import 'dotenv/config';
import { handleEvents } from './handlers/eventHandler';
import { handleCommands } from './handlers/commandHandler';
import { logger } from './utils/logger';
import { validateEnv } from './config/env';
import type { Command } from './types/command';

validateEnv();

logger.info('Inicializando o bot...');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

client.commands = new Collection<string, Command>();

(async () => {
  try {
    await handleEvents(client);
    await handleCommands(client);
    await client.login(process.env.TOKEN);
    logger.success('Bot conectado com sucesso!');
  } catch (error) {
    logger.error('Erro ao iniciar o bot:', error);
    process.exit(1);
  }
})();
