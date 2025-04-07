import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    ChannelType,
    TextChannel,
  } from 'discord.js';
  import { Command } from '../../types/command.js';
  
  const unlockCommand: Command = {
    data: new SlashCommandBuilder()
      .setName('unlock')
      .setDescription('Destranca um canal para permitir o envio de mensagens.')
      .addChannelOption(option =>
        option.setName('canal')
          .setDescription('Canal que você deseja destrancar.')
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
        SendMessages: null,
      });
  
      await interaction.reply(`🔓 O canal ${canal} foi destrancado com sucesso.`);
    },
  };
  
  export default unlockCommand;