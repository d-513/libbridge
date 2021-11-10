import { MessagingChannel } from "./Messaging/MessagingChannel";
import ConfigManager from "./Config/ConfigManager";
import { Config } from "./Config/Config";
import each from "p-each-series";

export const configManager = new ConfigManager();

type ModuleInit = (config: Config) => Promise<void>;
type ModuleBridgeChannel = (
  channelID: string,
  msgChannel: MessagingChannel
) => Promise<void>;

interface Module {
  init: ModuleInit;
  bridgeChannel: ModuleBridgeChannel;
}

interface ModuleList {
  [key: string]: Module;
}

(async () => {
  await configManager.initializeConfig();
  const config = configManager.config;
  console.log("[core] Initializing modules...");
  let mods: ModuleList = {};
  await each(config.load_modules, async (module) => {
    const mod: Module = await import(`./modules/${module}`);
    await mod.init(config);
    mods[module] = mod;
  });
  console.log("[core] Creating bridges...");
  await each(config.bridges, async (bridge) => {
    const channel = new MessagingChannel(bridge.name);
    for (const bridgeMod in bridge) {
      if (bridgeMod != "name") {
        if (!mods[bridgeMod]) {
          console.log("CRITIAL ERROR");
          console.log(
            `Module ${bridgeMod} referenced but not loaded via load_modules`
          );
        }

        // TODO fix type
        // @ts-ignore
        mods[bridgeMod].bridgeChannel(bridge[bridgeMod], channel);
      }
    }
  });
})();
