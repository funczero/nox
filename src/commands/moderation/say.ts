import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, TextChannel, NewsChannel, DMChannel } from 'discord.js';
import { Command } from '../../types/command.js';

const sayCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Faz o bot enviar uma mensagem personalizada.')
    .addStringOption(option =>
      option.setName('mensagem')
        .setDescription('A mensagem que o bot deve enviar.')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const mensagem = interaction.options.getString('mensagem', true);

    if (!(interaction.channel instanceof TextChannel || interaction.channel instanceof NewsChannel || interaction.channel instanceof DMChannel)) {
      await interaction.reply({ content: '❌ Este comando só pode ser usado em canais que suportam envio de mensagens.', ephemeral: true });
      return;
    }

    await interaction.reply({ content: '✅ Mensagem enviada!', ephemeral: true });
    await interaction.channel.send(mensagem);
  }
};

export default sayCommand;