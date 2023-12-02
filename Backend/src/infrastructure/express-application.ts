import { ExpressRouter } from './express-router';
import { ExpressServer } from './express-server';
import { UserService } from '../user/user.service';
import { UserDataService } from '../user/user.data-service';
import * as dotenv from 'dotenv';
import { ExpressDb } from './express-db';
import { TeacherDataService } from '../teacher/teacher.data-service';
import { StudentService } from '../student/student.service';
import { StudentDataService } from '../student/student.data-service';
import { GradeService } from '../grade/grade.service';
import { GradeDataService } from '../grade/grade.data-service';
import { TeacherService } from '../teacher/teacher.service';

export class ExpressApplication {
    private allowedMainOrigin!: string;
    private expressRouter!: ExpressRouter;
    private expressDb!: ExpressDb;
    private port!: string;
    private server!: ExpressServer;
    private userService!: UserService;
    private teacherService!: TeacherService;
    private studentService!: StudentService;
    private gradeService!: GradeService;

    constructor() {
        this.configureApplication();
    }

    bootstrap(): void {
        this.server.bootstrap();
    }

    private configureApplication(): void {
        this.configureEnvironment();
        this.configureVariables();
        this.configureServices();
        this.configureExpressRouter();
        this.configureServer();
        this.configureDb();
    }

    private configureEnvironment(): void {
        dotenv.config({
            path: '.env.template',
        });
    }
    private configureVariables(): void {
        this.configureAllowedMainOrigin();
        this.configureServerPort();
    }

    private configureAllowedMainOrigin(): void {
        this.allowedMainOrigin = this.getAllowedMainOrigin();
    }

    private getAllowedMainOrigin(): string {
        const allowedMainOrigin = process.env.ALLOWED_MAIN_ORIGIN;
        if (!allowedMainOrigin) {
            throw new Error('No allowed main origin was found in env file.');
        }

        return allowedMainOrigin;
    }

    private configureServerPort(): void {
        this.port = this.getPort();
    }

    private getPort(): string {
        const port = process.env.PORT;
        if (!port) {
            throw new Error('No port was found in env file.');
        }

        return port;
    }

    private configureServices(): void {
        this.userService = new UserDataService();
        this.teacherService = new TeacherDataService();
        this.studentService = new StudentDataService();
        this.gradeService = new GradeDataService();
    }

    private configureExpressRouter(): void {
        this.expressRouter = new ExpressRouter(
            this.userService,
            this.teacherService,
            this.studentService,
            this.gradeService,
        );
    }

    private configureServer(): void {
            this.server = new ExpressServer(
            this.allowedMainOrigin,
            this.expressRouter,
            this.port,
        );    }

    private configureDb(): void {
        const host = process.env.HOST;
        const user = process.env.USER;
        const password = process.env.PASSWORD;
        const database = process.env.DATABASE;

        this.expressDb = new ExpressDb(host!, user!, password!, database!);
    }
}
