import { Client, GatewayIntentBits, Partials, Collection } from 'discord.js';
import 'dotenv/config';
import { handleEvents } from './handlers/eventHandler.js';
import { handleCommands } from './handlers/commandHandler.js';
import { logger } from './utils/logger.js';
import { validateEnv } from './config/env.js';
import type { Command } from './types/command.js';

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
