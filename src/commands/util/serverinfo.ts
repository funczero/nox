import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from 'discord.js';
import { Command } from '../../types/command';
import { formatDate } from '../../utils/formatDate';

const serverInfoCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('🌐 Exibe informações sobre o servidor.'),

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const guild = interaction.guild;
    if (!guild) {
      await interaction.reply({
        content: '❌ Este comando só pode ser usado em servidores.',
        ephemeral: true,
      });
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle('🌐 Informações do Servidor')
      .setColor('Green')
      .setThumbnail(guild.iconURL({ size: 1024 }) ?? '')
      .addFields(
        { name: '📛 Nome', value: guild.name, inline: true },
        { name: '👥 Total de Membros', value: guild.memberCount.toString(), inline: true },
        {
          name: '📅 Criado em',
          value: formatDate(guild.createdAt),
        }
      )
      .setFooter({ text: `ID do Servidor: ${guild.id}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};

export default serverInfoCommand;
