import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    ChannelType,
    TextChannel
  } from 'discord.js';
  import { Command } from '../../types/command.js';
  
  const announceCommand: Command = {
    data: new SlashCommandBuilder()
      .setName('announce')
      .setDescription('Envia um anúncio em um canal específico.')
      .addChannelOption(option =>
        option.setName('canal')
          .setDescription('Canal onde o anúncio será enviado.')
          .addChannelTypes(ChannelType.GuildText)
          .setRequired(true)
      )
      .addStringOption(option =>
        option.setName('mensagem')
          .setDescription('Mensagem do anúncio.')
          .setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
      const canal = interaction.options.getChannel('canal') as TextChannel;
      const mensagem = interaction.options.getString('mensagem');
  
      try {
        await canal.send(`📢 **Anúncio:**\n${mensagem}`);
        await interaction.reply({ content: `✅ Anúncio enviado em ${canal}.`, ephemeral: true });
      } catch {
        await interaction.reply({ content: '❌ Ocorreu um erro ao enviar o anúncio.', ephemeral: true });
      }
    }
  };
  
  export default announceCommand;
  