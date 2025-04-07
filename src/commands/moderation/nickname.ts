import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    GuildMember
  } from 'discord.js';
  import { Command } from '../../types/command.js';
  
  const nicknameCommand: Command = {
    data: new SlashCommandBuilder()
      .setName('nickname')
      .setDescription('Altera o apelido de um usuário no servidor.')
      .addUserOption(option =>
        option.setName('usuario')
          .setDescription('Usuário que terá o apelido alterado.')
          .setRequired(true)
      )
      .addStringOption(option =>
        option.setName('apelido')
          .setDescription('Novo apelido. Deixe vazio para remover.')
          .setRequired(false)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),
  
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
      const usuario = interaction.options.getMember('usuario') as GuildMember;
      const apelido = interaction.options.getString('apelido');
  
      try {
        await usuario.setNickname(apelido || null);
        const resposta = apelido
          ? `✏️ Apelido de ${usuario.user.username} alterado para **${apelido}**.`
          : `🧼 Apelido de ${usuario.user.username} foi removido.`;
        await interaction.reply(resposta);
      } catch {
        await interaction.reply({ content: '❌ Não foi possível alterar o apelido.', ephemeral: true });
      }
    }
  };
  
  export default nicknameCommand;
  