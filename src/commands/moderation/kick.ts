import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    User
  } from 'discord.js';
  import { Command } from '../../types/command.js';
  
  const kickCommand: Command = {
    data: new SlashCommandBuilder()
      .setName('kick')
      .setDescription('Expulsa um membro do servidor.')
      .addUserOption(option =>
        option.setName('usuario')
          .setDescription('Usuário a ser expulso.')
          .setRequired(true)
      )
      .addStringOption(option =>
        option.setName('motivo')
          .setDescription('Motivo da expulsão.')
          .setRequired(false)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
      const usuario = interaction.options.getUser('usuario', true) as User;
      const motivo = interaction.options.getString('motivo') || 'Não especificado';
  
      const membro = await interaction.guild?.members.fetch(usuario.id).catch(() => null);
      if (!membro) {
        await interaction.reply({ content: '❌ Não encontrei esse membro no servidor.', ephemeral: true });
        return;
      }
  
      if (!membro.kickable) {
        await interaction.reply({ content: '❌ Não posso expulsar esse membro.', ephemeral: true });
        return;
      }
  
      await membro.kick(motivo);
      await interaction.reply(`👢 ${usuario.tag} foi expulso. Motivo: ${motivo}`);
    }
  };
  
  export default kickCommand;
  