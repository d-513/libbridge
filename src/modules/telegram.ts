import { Config } from "../Config/Config";
import { MessagingChannel } from "../Messaging/MessagingChannel";
import { Message } from "../Messaging/Message";
import { Telegraf } from "telegraf";

let unsafeBot: Telegraf | null = null;

export async function init(config: Config) {
  let telegram_token = config.settings.telegram?.bot_token;
  if (!telegram_token) return;
  console.log("[telegram] starting");
  unsafeBot = new Telegraf(telegram_token);
  unsafeBot.launch();
}

export async function bridgeChannel(
  channelID: string,
  msgChannel: MessagingChannel
) {
  if (!unsafeBot) return;
  const bot: Telegraf = unsafeBot;
  console.log(
    `[telegram] bridging channel ${msgChannel.name} with telegramid ${channelID}`
  );
  const client = msgChannel.registerClient("telegram");

  client.on("message", (message) => {
    bot.telegram?.sendMessage(
      channelID,
      `${message.author.name}: ${message.text}`
    );
  });

  bot.on("text", async (ctx) => {
    if (ctx.chat.id.toString() !== channelID) return;
    const member = await ctx.getChatMember(ctx.from.id)
    
    const messageSend: Message = {
      text: ctx.message.text,
      author: {
        name:
      }
    }
  });
}
