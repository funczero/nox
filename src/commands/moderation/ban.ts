import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    User
  } from 'discord.js';
  import { Command } from '../../types/command.js';
  
  const banCommand: Command = {
    data: new SlashCommandBuilder()
      .setName('ban')
      .setDescription('Bane um membro do servidor.')
      .addUserOption(option =>
        option.setName('usuario')
          .setDescription('Usuário a ser banido.')
          .setRequired(true)
      )
      .addStringOption(option =>
        option.setName('motivo')
          .setDescription('Motivo do banimento.')
          .setRequired(false)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
      const usuario = interaction.options.getUser('usuario', true) as User;
      const motivo = interaction.options.getString('motivo') || 'Não especificado';
  
      const membro = await interaction.guild?.members.fetch(usuario.id).catch(() => null);
      if (!membro) {
        await interaction.reply({ content: '❌ Não encontrei esse membro no servidor.', ephemeral: true });
        return;
      }
  
      if (!membro.bannable) {
        await interaction.reply({ content: '❌ Não posso banir esse membro.', ephemeral: true });
        return;
      }
  
      await membro.ban({ reason: motivo });
      await interaction.reply(`✅ ${usuario.tag} foi banido. Motivo: ${motivo}`);
    }
  };
  
  export default banCommand;
  