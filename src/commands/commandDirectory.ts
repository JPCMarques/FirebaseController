import { isNullOrUndefined } from "util";
import * as winston from "winston";
import { Constants } from "../constants";
import { logError, logInfo } from "../util/logController";
import { Command, ICommandMessage } from "./command";
import { NewAppData } from "./newAppData";

export class CommandController {
    public static commandDirectory: Command[] = [new NewAppData()];

    public static parseCommands(input: string): void {
        CommandController.commandDirectory.forEach((command) => {
            command.run(input).then((results: ICommandMessage[]) => {
                results.forEach((result) => {
                    if (result.success) {
                        logInfo(result.message + "\n", result.extraData);
                    } else {
                        logError(result.message + "\n", result.extraData);
                    }
                });
            }).catch((err) => {
                if (isNullOrUndefined(err)) {
                    logError(Constants.UNKNOWN_ERROR);
                } else {
                    logError(err);
                }
            });
        });
    }
}
