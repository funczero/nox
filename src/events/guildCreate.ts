import { Guild } from 'discord.js';
import { logger } from '../utils/logger';

export default {
  name: 'guildCreate',
  execute(guild: Guild) {
    logger.info(`➕ Entrou no servidor: ${guild.name} (ID: ${guild.id})`);
  },
};
