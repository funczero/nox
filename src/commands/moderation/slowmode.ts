import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    ChannelType,
    TextChannel,
  } from 'discord.js';
  import { Command } from '../../types/command.js';
  
  const slowmodeCommand: Command = {
    data: new SlashCommandBuilder()
      .setName('slowmode')
      .setDescription('Define o modo lento de um canal.')
      .addIntegerOption(option =>
        option.setName('tempo')
          .setDescription('Tempo em segundos entre cada mensagem (0 para desativar).')
          .setMinValue(0)
          .setMaxValue(21600)
          .setRequired(true)
      )
      .addChannelOption(option =>
        option.setName('canal')
          .setDescription('Canal que terá o modo lento alterado.')
          .addChannelTypes(ChannelType.GuildText)
          .setRequired(false)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
      const tempo = interaction.options.getInteger('tempo', true);
      const canal = interaction.options.getChannel('canal') || interaction.channel;
  
      if (!canal || !(canal instanceof TextChannel)) {
        await interaction.reply({ content: '❌ Canal inválido.', ephemeral: true });
        return;
      }
  
      await canal.setRateLimitPerUser(tempo);
  
      await interaction.reply(`🐢 O modo lento do canal ${canal} foi definido para ${tempo} segundo(s).`);
    }
  };
  
  export default slowmodeCommand;