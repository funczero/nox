import { Client, Interaction } from 'discord.js';
import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { logger } from '../utils/logger';
import type { Command } from '../types/command';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const handleCommands = async (client: Client): Promise<void> => {
  const commandsPath = join(__dirname, '../commands');
  const folders = readdirSync(commandsPath);

  for (const folder of folders) {
    const folderPath = join(commandsPath, folder);
    const commandFiles = readdirSync(folderPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

    for (const file of commandFiles) {
      const filePath = join(folderPath, file);

      try {
        const { default: command }: { default: Command } = await import(pathToFileURL(filePath).toString());

        if (command?.data && typeof command.execute === 'function') {
          client.commands.set(command.data.name, command);
          logger.success(`Comando carregado: ${command.data.name}`);
        } else {
          logger.warn(`❌ Estrutura inválida no comando: ${file}`);
        }
      } catch (err) {
        logger.error(`Erro ao carregar o comando ${file}:`, err);
      }
    }
  }

  client.on('interactionCreate', async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand() && !interaction.isContextMenuCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (err) {
      logger.error(`Erro ao executar o comando ${interaction.commandName}:`, err);
      if (interaction.isRepliable()) {
        await interaction.reply({
          content: '❌ Ocorreu um erro ao executar o comando.',
          ephemeral: true,
        }).catch(() => {});
      }
    }
  });
};
