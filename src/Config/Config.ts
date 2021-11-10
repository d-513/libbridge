/** @see {isConfig} ts-auto-guard:type-guard */
export interface Config {
  version: string;
  load_modules: string[];
  settings: {
    discord?: {
      bot_token: string;
    };
    telegram?: {
      bot_token: string;
    };
  };
  bridges: Bridge[];
}

interface Bridge {
  name: string;
  discord?: string;
  telegram?: string;
}
