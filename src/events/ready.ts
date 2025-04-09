import { Client, ActivityType } from 'discord.js';

export default {
  name: 'ready',
  once: true,
  execute(client: Client) {
    console.log(`[✅ SUCCESS] Bot online como ${client.user?.tag}`);

    client.user?.setPresence({
      status: 'dnd', 
      activities: [
        {
          name: 'Assistindo comandos serem executados! 🚀',
          type: ActivityType.Watching,
        },
      ],
    });

    console.log('[STATUS] Status inicial definido como "Não Perturbe".');
  },
};