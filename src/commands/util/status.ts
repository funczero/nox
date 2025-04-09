import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    ActivityType,
  } from 'discord.js';
  import { Command } from '../../types/command.js';
  
  const statusCommand: Command = {
    data: new SlashCommandBuilder()
      .setName('status')
      .setDescription('Altera o status e a atividade do bot.')
      .addStringOption(option =>
        option.setName('status')
          .setDescription('Novo status do bot.')
          .setRequired(true)
          .addChoices(
            { name: 'Online', value: 'online' },
            { name: 'Ausente', value: 'idle' },
            { name: 'Não Perturbe', value: 'dnd' },
            { name: 'Invisível', value: 'invisible' },
          )
      )
      .addStringOption(option =>
        option.setName('atividade')
          .setDescription('Texto da atividade do bot.')
          .setRequired(false)
      )
      .addStringOption(option =>
        option.setName('tipo')
          .setDescription('Tipo de atividade do bot.')
          .setRequired(false)
          .addChoices(
            { name: 'Jogando', value: 'Playing' },
            { name: 'Transmitindo', value: 'Streaming' },
            { name: 'Ouvindo', value: 'Listening' },
            { name: 'Assistindo', value: 'Watching' },
            { name: 'Competindo', value: 'Competing' },
          )
      ),
  
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
      const status = interaction.options.getString('status', true) as 'online' | 'idle' | 'dnd' | 'invisible';
      const atividade = interaction.options.getString('atividade') || 'Trabalhando!';
      const tipo = interaction.options.getString('tipo') || 'Playing';
  
      interaction.client.user?.setPresence({
        status,
        activities: [{ name: atividade, type: ActivityType[tipo as keyof typeof ActivityType] }],
      });
  
      await interaction.reply(`✅ Status alterado para **${status}** com a atividade: **${atividade}** (${tipo}).`);
    },
  };
  
  export default statusCommand;