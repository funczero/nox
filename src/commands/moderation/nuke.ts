import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    ChannelType,
    TextChannel,
  } from 'discord.js';
  import { Command } from '../../types/command.js';
  
  const nukeCommand: Command = {
    data: new SlashCommandBuilder()
      .setName('nuke')
      .setDescription('Clona o canal e deleta o original (limpa todas as mensagens).')
      .addChannelOption(option =>
        option.setName('canal')
          .setDescription('Canal a ser limpo.')
          .addChannelTypes(ChannelType.GuildText)
          .setRequired(false)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
      const canal = interaction.options.getChannel('canal') || interaction.channel;
  
      if (!canal || !(canal instanceof TextChannel)) {
        await interaction.reply({ content: '❌ Este comando só pode ser usado em canais de texto.', ephemeral: true });
        return;
      }
  
      const novoCanal = await canal.clone();
      await canal.delete();
  
      await novoCanal.send(`💣 Canal reiniciado por ${interaction.user}.`);
      await interaction.reply({ content: `✅ Canal ${novoCanal} foi reiniciado com sucesso.`, ephemeral: true });
    }
  };
  
  export default nukeCommand;