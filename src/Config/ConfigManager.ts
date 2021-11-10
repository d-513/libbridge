import fs from "fs-extra";
import yaml from "js-yaml";
import { Config } from "./Config";
import { isConfig } from "./Config.guard";

export default class ConfigManager {
  configFile: string = "./config.yaml";
  config: Config;
  constructor(configFile = "./config.yaml") {
    this.configFile = configFile;
  }

  public async initializeConfig() {
    const exists = fs.existsSync(this.configFile);
    if (!exists) {
      await fs.copy("./src/default.cnf.yaml", this.configFile);
      console.log("Default config file copied - exiting...");
      process.exit(0);
    }
    const configRaw = await fs.readFile(this.configFile, "utf-8");
    const configUnsafe = yaml.load(configRaw);
    console.log(configUnsafe);
    if (isConfig(configUnsafe)) {
      this.config = configUnsafe;
    } else {
      console.log("Invalid config file. Please consult the Manual and Wiki");
      process.exit(1);
    }
  }
}
