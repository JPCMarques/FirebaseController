import getStdin from "get-stdin";
import * as inquirer from "inquirer";
import * as winston from "winston";
import { CommandController } from "./commands/commandDirectory";
import { FirebaseHandler } from "./firebase";

export async function initializeCLI(): Promise<any> {
    getStdin().then((input) => {
        CommandController.parseCommands(input);
    });
}
