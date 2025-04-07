import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    User
  } from 'discord.js';
  import { Command } from '../../types/command.js';
  
  const unmuteCommand: Command = {
    data: new SlashCommandBuilder()
      .setName('unmute')
      .setDescription('Remove o mute de um membro.')
      .addUserOption(option =>
        option.setName('usuario')
          .setDescription('Usuário a ser desmutado.')
          .setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
      const usuario = interaction.options.getUser('usuario', true) as User;
      const membro = await interaction.guild?.members.fetch(usuario.id).catch(() => null);
  
      if (!membro) {
        await interaction.reply({ content: '❌ Não encontrei esse membro no servidor.', ephemeral: true });
        return;
      }
  
      if (!membro.moderatable || !membro.communicationDisabledUntil) {
        await interaction.reply({ content: '❌ Esse membro não está silenciado ou não pode ser desmutado.', ephemeral: true });
        return;
      }
  
      await membro.timeout(null);
      await interaction.reply(`✅ ${usuario.tag} foi desmutado com sucesso.`);
    }
  };
  
  export default unmuteCommand;
  