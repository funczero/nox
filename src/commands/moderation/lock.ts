import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    ChannelType,
    TextChannel,
  } from 'discord.js';
  import { Command } from '../../types/command';
  
  const lockCommand: Command = {
    data: new SlashCommandBuilder()
      .setName('lock')
      .setDescription('Tranca um canal para que os membros não possam enviar mensagens.')
      .addChannelOption(option =>
        option.setName('canal')
          .setDescription('Canal que você deseja trancar.')
          .addChannelTypes(ChannelType.GuildText)
          .setRequired(false)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
      const canal = interaction.options.getChannel('canal') || interaction.channel;
  
      if (!canal || canal.type !== ChannelType.GuildText || !(canal instanceof TextChannel)) {
        await interaction.reply({ content: '❌ Canal inválido.', ephemeral: true });
        return;
      }
  
      await canal.permissionOverwrites.edit(interaction.guild!.roles.everyone, {
        SendMessages: false,
      });
  
      await interaction.reply(`🔒 O canal ${canal} foi trancado com sucesso.`);
    },
  };
  
  export default lockCommand;