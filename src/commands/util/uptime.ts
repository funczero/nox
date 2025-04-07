import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { Command } from '../../types/command.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import 'dayjs/locale/pt-br.js';

dayjs.extend(duration);
dayjs.locale('pt-br');

const uptimeCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('uptime')
    .setDescription('Mostra há quanto tempo o bot está online.'),

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const uptime = interaction.client.uptime ?? 0;
    const formatted = dayjs.duration(uptime).humanize();

    await interaction.reply(`🟢 O bot está online há **${formatted}**.`);
  }
};

export default uptimeCommand;
