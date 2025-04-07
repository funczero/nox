import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    GuildMember,
    Role
  } from 'discord.js';
  import { Command } from '../../types/command.js';
  
  const removeroleCommand: Command = {
    data: new SlashCommandBuilder()
      .setName('removerole')
      .setDescription('Remove um cargo de um usuário.')
      .addUserOption(option =>
        option.setName('usuario')
          .setDescription('Usuário que terá o cargo removido.')
          .setRequired(true)
      )
      .addRoleOption(option =>
        option.setName('cargo')
          .setDescription('Cargo a ser removido.')
          .setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
  
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
      const membro = interaction.options.getMember('usuario') as GuildMember;
      const cargo = interaction.options.getRole('cargo') as Role;
  
      if (!membro.roles.cache.has(cargo.id)) {
        await interaction.reply({ content: `⚠️ O usuário não possui o cargo ${cargo}.`, ephemeral: true });
        return;
      }
  
      try {
        await membro.roles.remove(cargo);
        await interaction.reply(`🗑️ Cargo ${cargo} removido de ${membro.user.username}.`);
      } catch {
        await interaction.reply({ content: '❌ Não foi possível remover o cargo.', ephemeral: true });
      }
    }
  };
  
  export default removeroleCommand;
  