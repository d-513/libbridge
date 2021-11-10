import Discord from "discord.js";
import { Config } from "../Config/Config";
import { Message } from "../Messaging/Message";
import { MessagingChannel } from "../Messaging/MessagingChannel";

const bot = new Discord.Client({ intents: ["GUILD_MESSAGES"] });

bot.once("ready", () => console.log(`[discord] logged in as ${bot.user?.tag}`));

const awaitReady = () =>
  new Promise((resolve) => {
    bot.once("ready", resolve);
  });

export async function init(config: Config) {
  let discord_token = config.settings.discord?.bot_token;
  if (!discord_token) return;
  console.log("[discord] starting");
  bot.login(discord_token);
  await awaitReady();
  console.log("[discord] ready");
}

export async function bridgeChannel(
  channelID: string,
  msgChannel: MessagingChannel
) {
  console.log(
    `[discord] bridging channel ${msgChannel.name} with discordid ${channelID}`
  );
  const discordChannel = await bot.channels.fetch(channelID);

  if (!textChannelGuard(discordChannel)) return;
  const client = msgChannel.registerClient("discord");

  client.on("message", (message) => {
    discordChannel.send(`${message.author.name}: ${message.text}`);
  });

  bot.on("messageCreate", (message) => {
    if (message.channel.id !== channelID) return;
    if (message.author.id === bot.user?.id) return;
    const messageSend: Message = {
      text: message.content,
      author: {
        name: message.author.username,
        avatar_url: message.author.avatarURL(),
      },
    };
    client.send("message", messageSend);
  });
}

function textChannelGuard(
  channel: Discord.Channel | null
): channel is Discord.TextChannel {
  return channel?.type === "GUILD_TEXT";
}
