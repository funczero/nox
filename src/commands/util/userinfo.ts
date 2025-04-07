import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from 'discord.js';
import { Command } from '../../types/command.js';
import { formatDate } from '../../utils/formatDate.js';

const userInfoCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('📋 Exibe informações sobre o seu usuário.'),

  async execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.user;

    const embed = new EmbedBuilder()
      .setTitle('👤 Informações do Usuário')
      .setColor('Blurple')
      .setThumbnail(user.displayAvatarURL({ size: 1024 }))
      .addFields(
        { name: '🆔 ID', value: user.id, inline: true },
        { name: '👤 Nome', value: user.username, inline: true },
        {
          name: '📅 Conta criada em',
          value: formatDate(user.createdAt),
        },
      )
      .setFooter({ text: `Solicitado por ${user.tag}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};

export default userInfoCommand;