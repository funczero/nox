import { REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';
import 'dotenv/config';
import { logger } from '../utils/logger.js';

export const registerCommands = async () => {
  const commands = [];
  const folders = readdirSync(join(process.cwd(), 'src/commands'));

  for (const folder of folders) {
    const files = readdirSync(join(process.cwd(), 'src/commands', folder)).filter(f => f.endsWith('.ts'));

    for (const file of files) {
      const command = (await import(`../commands/${folder}/${file}`)).default;
      if (command?.data) {
        commands.push(command.data.toJSON());
      }
    }
  }

  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN!);

  try {
    logger.info('Atualizando comandos de barra...');

    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!),
      { body: commands }
    );

    logger.success('Comandos registrados com sucesso!');
  } catch (err) {
    logger.error(`Erro ao registrar comandos: ${err}`);
  }
};
