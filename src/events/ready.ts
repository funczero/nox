// src/events/ready.ts
import { Client } from 'discord.js';

export default {
  name: 'ready',
  once: true,
  execute(client: Client) {
    console.log(`[✅ SUCCESS] Bot online como ${client.user?.tag}`);
  },
};
