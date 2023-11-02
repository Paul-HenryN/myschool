import { ExpressServer } from "./express-server";
import * as dotenv from 'dotenv';
export class ExpressApplication {
    private port!: string;
    private server!: ExpressServer;


    constructor() {
        this.configureApplication();
    }

    bootstrap(): void {
        this.server.bootstrap();
    }

    private configureApplication(): void {
        this.configureEnvironment();
        this.configureServerPort();
        this.configureServer();

    } 


    private configureEnvironment(): void {
        dotenv.config({
            path: '.env'
        });
    }

    private configureServerPort(): void {
        this.port = this.getPort();
    }

    private configureServer(): void {
        this.server = new ExpressServer(this.port);
    }

    private getPort(): string {
        const port = process.env.PORT;
        if (!port) {
            throw new Error('No port was found in env file.');
        }

        return port;
    }
}
