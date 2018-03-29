import * as events from "events";
import * as winston from "winston";
import { initializeCLI } from "./cli";

class MainController {
    constructor() {
        winston.add(winston.transports.File, {filename: `log-${Date.now().valueOf()}.log`, dirname: "logs"});
        this.init();
    }

    public init(): void  {
        initializeCLI();
    }
}

const controller = new MainController();
