import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, TextChannel, NewsChannel } from 'discord.js';
import { Command } from '../../types/command.js';

const limparCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('limpar')
    .setDescription('Limpa uma quantidade de mensagens do canal.')
    .addIntegerOption(option =>
      option.setName('quantidade')
        .setDescription('Número de mensagens a apagar (1-100).')
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const quantidade = interaction.options.getInteger('quantidade', true);
    const canal = interaction.channel;

    if (!(canal instanceof TextChannel || canal instanceof NewsChannel)) {
      await interaction.reply({ content: '❌ Este comando só pode ser usado em canais de texto.', ephemeral: true });
      return;
    }

    try {
      const mensagens = await canal.bulkDelete(quantidade, true);
      await interaction.reply({ content: `✅ ${mensagens.size} mensagens foram apagadas.`, ephemeral: true });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: '❌ Ocorreu um erro ao apagar as mensagens.', ephemeral: true });
    }
  }
};

export default limparCommand;