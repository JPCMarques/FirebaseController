import { isNullOrUndefined } from "util";

export abstract class Command {
    protected regex: RegExp;

    protected constructor(regex: RegExp) {
        this.regex = regex;
    }

    public async run(contentBuffer: string): Promise<ICommandMessage[]> {
        const regexResult = this.regex.exec(contentBuffer);
        if (isNullOrUndefined(regexResult)) {
            return Promise.resolve([{
                message: `Could not find a match for ${this.regex} in ${contentBuffer}.`,
                success: false,
            }]);
        }

        return Promise.all(regexResult.map((element) => {
            return this.execute(this.filterData(element));
        }));
    }

    protected abstract async execute(data: string): Promise<ICommandMessage>;

    // Should be overridden if any other filtering operation is needed, as
    // this assumes the standard format of --<commandId>:"arg(s)".
    protected filterData(data: string): string {
        return data.substring(data.indexOf("\"") + 1, data.lastIndexOf("\""));
    }
}

export interface ICommandMessage {
    message: string;
    success: boolean;
    extraData?: {
        [index: string]: string;
    };
}
