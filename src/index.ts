import { Client, Intents } from "discord.js";
import { interactionCreateListener } from "./listeners/interaction-create-listener";
import { guildId, token } from "./config";
import { readyListener } from "./listeners/ready-listener";
import { messageReactionAddListener } from "./listeners/message-reaction-add-listener";
import { registerSlashCommands } from "./listeners/register-commands";
import { guildMemberAddListener } from "./features/gatehouse/guild-member-add-listener";
import { guildMemberLeaveListener } from "./features/removed/guild-member-leave-listener";
import { messageCreateListener } from "./listeners/message-create-listener";
import https from "https";

// Global
https.globalAgent.maxSockets = 5;

export const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  partials: ["MESSAGE", "REACTION"],
});

export const getGuild = async () => {
  const guilds = await client.guilds.fetch();
  const guild = await guilds.get(guildId)?.fetch();
  if (!guild) {
    throw new Error("Could not collect guild members");
  }
  return guild;
};

export const getMembers = async () => {
  const guild = await getGuild();
  return await guild.members.fetch();
};

export const getRoles = async () => {
  const guild = await getGuild();
  return await guild.roles.fetch();
};

client.login(token);
client.on("interactionCreate", interactionCreateListener);
client.on("messageReactionAdd", messageReactionAddListener);
client.on("messageCreate", messageCreateListener);
client.on("ready", readyListener);
client.on("guildMemberAdd", guildMemberAddListener);
client.on("guildMemberRemove", guildMemberLeaveListener);

registerSlashCommands();

console.log("Listening...");
