import { Interaction } from 'discord.js';
import { logger } from '../utils/logger';

export default {
  name: 'interactionCreate',
  async execute(interaction: Interaction) {
    logger.info(`🔍 Interação recebida: ${interaction.type}`);
  },
};
