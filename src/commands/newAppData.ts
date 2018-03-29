import { readFile, readFileSync } from "fs";
import { format } from "util";
import { Command, ICommandMessage } from "./command";
import { CommandConstants } from "./constants";

export class NewAppData extends Command {

    public constructor() {
        super(new RegExp("--newAppData:\".*\"", "g"));
    }

    protected execute(data: string): Promise<ICommandMessage> {
        try {
            const fileContents = readFileSync(data, {encoding: "utf8"});
            return Promise.resolve({
                extraData: {
                    input: data,
                    output: fileContents,
                },
                message: fileContents,
                success: true,
            });
        } catch (errorMessage) {
            return Promise.resolve({
                extraData: {
                    input: data,
                },
                message: format(CommandConstants.NewAppCommand.FILE_ERROR, errorMessage),
                success: false,
            });
        }
    }
}
