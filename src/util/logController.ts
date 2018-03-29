import * as winston from "winston";
import { CentralSettings } from "./centralSettings";

export function logInfo(msg: string, ...meta: any[]) {
    if (CentralSettings.DebugMode) {
        winston.info(msg, meta);
    } else {
        winston.info(msg);
    }
}

export function logError(msg: string, ...meta: any[]) {
    if (CentralSettings.DebugMode) {
        winston.error(msg, meta);
    } else {
        winston.error(msg);
    }
}
