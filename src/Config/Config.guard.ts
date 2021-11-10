/*
 * Generated type guards for "Config.ts".
 * WARNING: Do not manually change this file.
 */
import { Config } from "./Config";

export function isConfig(obj: any, _argumentName?: string): obj is Config {
    return (
        (obj !== null &&
            typeof obj === "object" ||
            typeof obj === "function") &&
        typeof obj.version === "string" &&
        Array.isArray(obj.load_modules) &&
        obj.load_modules.every((e: any) =>
            typeof e === "string"
        ) &&
        (obj.settings !== null &&
            typeof obj.settings === "object" ||
            typeof obj.settings === "function") &&
        (obj.settings.discord !== null &&
            typeof obj.settings.discord === "object" ||
            typeof obj.settings.discord === "function") &&
        typeof obj.settings.discord.bot_token === "string" &&
        Array.isArray(obj.bridges) &&
        obj.bridges.every((e: any) =>
            (e !== null &&
                typeof e === "object" ||
                typeof e === "function") &&
            typeof e.name === "string" &&
            (typeof e.discord === "undefined" ||
                typeof e.discord === "string") &&
            (typeof e.messenger === "undefined" ||
                typeof e.messenger === "string")
        )
    )
}
