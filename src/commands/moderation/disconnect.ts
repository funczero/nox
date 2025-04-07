import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  ChannelType,
  VoiceChannel,
} from 'discord.js';
import { Command } from '../../types/command.js';

const disconnectCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('disconnect')
    .setDescription('Desconecta todos os usuários de um canal de voz.')
    .addChannelOption(option =>
      option.setName('canal')
        .setDescription('Canal de voz que você quer esvaziar.')
        .addChannelTypes(ChannelType.GuildVoice)
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.MoveMembers),

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const canal = interaction.options.getChannel('canal');

    if (!canal || !(canal instanceof VoiceChannel)) {
      await interaction.reply({ content: '❌ Este comando só funciona em canais de voz.', ephemeral: true });
      return;
    }

    for (const member of canal.members.values()) {
      if (member.voice.channel) {
        await member.voice.disconnect();
      }
    }

    await interaction.reply(`🔇 Todos os usuários foram desconectados do canal ${canal.name}.`);
  }
};

export default disconnectCommand;