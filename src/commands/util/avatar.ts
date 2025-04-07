import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from 'discord.js';
import { Command } from '../../types/command';

const avatarCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('🖼️ Exibe o avatar de um usuário.')
    .addUserOption(option =>
      option
        .setName('usuario')
        .setDescription('O usuário cujo avatar deseja visualizar.')
        .setRequired(false)
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser('usuario') || interaction.user;
    const avatarUrl = user.displayAvatarURL({ extension: 'png', size: 1024 });

    const embed = new EmbedBuilder()
      .setTitle(`🖼️ Avatar de ${user.username}`)
      .setImage(avatarUrl)
      .setColor('Random')
      .setFooter({ text: `ID: ${user.id}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};

export default avatarCommand;


