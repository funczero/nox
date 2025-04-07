import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { Command } from '../../types/Command.js';

const pingCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Mostra a latência do bot.'),

  async execute(interaction: ChatInputCommandInteraction) {
    const sent = await interaction.reply({ content: '🏓 Pong!', fetchReply: true });
    interaction.editReply(`🏓 Pong! Latência: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
  }
};

export default pingCommand;