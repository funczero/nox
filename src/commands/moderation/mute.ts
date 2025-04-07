import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  User,
} from 'discord.js';
import { Command } from '../../types/command.js';

const muteCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Silencia um membro temporariamente.')
    .addUserOption(option =>
      option.setName('usuario')
        .setDescription('Usuário a ser silenciado.')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('tempo')
        .setDescription('Tempo em minutos (máx: 10080 minutos / 7 dias).')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('motivo')
        .setDescription('Motivo do mute.')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const usuario = interaction.options.getUser('usuario', true) as User;
    const tempo = interaction.options.getInteger('tempo', true);
    const motivo = interaction.options.getString('motivo') || 'Não especificado';

    const membro = await interaction.guild?.members.fetch(usuario.id).catch(() => null);
    if (!membro) {
      await interaction.reply({ content: '❌ Usuário não encontrado no servidor.', ephemeral: true });
      return;
    }

    if (!membro.moderatable) {
      await interaction.reply({ content: '❌ Não posso silenciar esse membro.', ephemeral: true });
      return;
    }

    const tempoMs = tempo * 60 * 1000;
    if (tempoMs > 604800000) {
      await interaction.reply({ content: '❌ O tempo máximo é de 7 dias (10080 minutos).', ephemeral: true });
      return;
    }

    await membro.timeout(tempoMs, motivo);
    await interaction.reply(`🔇 ${usuario.tag} foi silenciado por ${tempo} minutos. Motivo: ${motivo}`);
  }
};

export default muteCommand;