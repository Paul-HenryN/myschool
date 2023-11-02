import { ExpressRouter } from './express-router';
import { ExpressServer } from './express-server';
import { UserService } from '../user/user.service';
import { UserDataService } from '../user/user.data-service';
import * as dotenv from 'dotenv';
import { ExpressDb } from './express-db';

export class ExpressApplication {
    private expressRouter!: ExpressRouter;
    private expressDb!: ExpressDb;
    private port!: string;
    private server!: ExpressServer;
    private userService!: UserService;

    constructor() {
        this.configureApplication();
    }

    bootstrap(): void {
        this.server.bootstrap();
    }

    private configureApplication(): void {
        this.configureEnvironment();
        this.configureServerPort();
        this.configureServices();
        this.configureExpressRouter();
        this.configureDb();
        this.configureServer();

        this.expressDb.executeQuery('SELECT * from notes');
    }

    private configureEnvironment(): void {
        dotenv.config({
            path: '.env',
        });
    }

    private configureServerPort(): void {
        this.port = this.getPort();
    }

    private configureServices(): void {
        this.userService = new UserDataService();
    }

    private configureExpressRouter(): void {
        this.expressRouter = new ExpressRouter(this.userService);
    }

    private configureServer(): void {
        this.server = new ExpressServer(this.expressRouter, this.port);
    }

    private getPort(): string {
        const port = process.env.PORT;
        if (!port) {
            throw new Error('No port was found in env file.');
        }

        return port;
    }

    private configureDb(): void {
        const host = process.env.HOST;
        const user = process.env.USER;
        const password = process.env.PASSWORD;
        const database = process.env.DATABASE;

        this.expressDb = new ExpressDb(host!, user!, password!, database!);
    }
}
