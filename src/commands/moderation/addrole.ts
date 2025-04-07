import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    GuildMember,
    Role
  } from 'discord.js';
  import { Command } from '../../types/command.js';
  
  const addroleCommand: Command = {
    data: new SlashCommandBuilder()
      .setName('addrole')
      .setDescription('Adiciona um cargo a um usuário.')
      .addUserOption(option =>
        option.setName('usuario')
          .setDescription('Usuário que receberá o cargo.')
          .setRequired(true)
      )
      .addRoleOption(option =>
        option.setName('cargo')
          .setDescription('Cargo a ser adicionado.')
          .setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
  
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
      const membro = interaction.options.getMember('usuario') as GuildMember;
      const cargo = interaction.options.getRole('cargo') as Role;
  
      if (membro.roles.cache.has(cargo.id)) {
        await interaction.reply({ content: `⚠️ O usuário já possui o cargo ${cargo}.`, ephemeral: true });
        return;
      }
  
      try {
        await membro.roles.add(cargo);
        await interaction.reply(`✅ Cargo ${cargo} adicionado a ${membro.user.username}.`);
      } catch {
        await interaction.reply({ content: '❌ Não foi possível adicionar o cargo.', ephemeral: true });
      }
    }
  };
  
  export default addroleCommand;
  