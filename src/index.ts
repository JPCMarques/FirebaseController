import * as events from "events";
import { existsSync, mkdirSync } from "fs";
import * as winston from "winston";
import { initializeCLI } from "./cli";
import { SharedConstants } from "./constants";

class MainController {
    constructor() {
        if ( !existsSync( SharedConstants.LOG_DIR ) ) {
            // Create the directory if it does not exist
            mkdirSync( SharedConstants.LOG_DIR );
        }
        winston.add(winston.transports.File, {
                                                dirname: SharedConstants.LOG_DIR,
                                                filename: `log-${Date.now().valueOf()}.log`,
                                            });
        this.init();
    }

    public init(): void  {
        initializeCLI();
    }
}

const controller = new MainController();
