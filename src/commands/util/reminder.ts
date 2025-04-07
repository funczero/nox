import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { Command } from '../../types/command.js';

const reminderCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('reminder')
    .setDescription('Define um lembrete para você.')
    .addStringOption(option =>
      option.setName('mensagem')
        .setDescription('Mensagem do lembrete.')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('tempo')
        .setDescription('Tempo em minutos até o lembrete.')
        .setRequired(true)
    ),

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const mensagem = interaction.options.getString('mensagem', true);
    const tempo = interaction.options.getInteger('tempo', true);

    if (tempo <= 0 || tempo > 1440) {
      await interaction.reply('❌ O tempo deve estar entre 1 e 1440 minutos (24 horas).');
      return;
    }

    await interaction.reply(`⏰ Lembrete definido! Você será lembrado em **${tempo} minutos**.`);

    setTimeout(() => {
      interaction.user.send(`⏰ **Lembrete:** ${mensagem}`).catch(() => {
        console.error(`Não consegui enviar DM para ${interaction.user.tag}.`);
      });
    }, tempo * 60 * 1000);
  }
};

export default reminderCommand;
