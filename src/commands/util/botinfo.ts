import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { Command } from '../../types/command.js';
import dayjs from '../../utils/dayjs.js';
import os from 'os';
import pkg from '../../../package.json' with { type: 'json' };

const botinfoCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Exibe informações detalhadas sobre o bot.'),

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const uptime = interaction.client.uptime ?? 0;
    const createdAt = dayjs(interaction.client.user?.createdAt).format('DD/MM/YYYY HH:mm:ss');

    const info = [
      `🤖 Nome: **${interaction.client.user?.username}**`,
      `🆔 ID: **${interaction.client.user?.id}**`,
      `⏳ Online há: **${dayjs.duration(uptime).humanize()}**`,
      `📆 Criado em: **${createdAt}**`,
      `⚙️ Node.js: **${process.version}**`,
      `🧠 Memória usada: **${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB**`,
      `📦 Versão: **v${pkg.version}**`,
      `🖥️ Sistema: **${os.type()} ${os.arch()} ${os.release()}**`
    ];

    await interaction.reply(info.join('\n'));
  }
};

export default botinfoCommand;