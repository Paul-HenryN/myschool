import { ExpressRouter } from './express-router';
import { ExpressServer } from './express-server';
import { UserService } from '../user/user.service';
import { UserDbService } from '../user/user.db-service';
import { AuthService } from '../auth/auth.service';
import { AuthDbService } from '../auth/auth.db-service';
import { StudentService } from '../student/student.service';
import { StudentDbService } from '../student/student.db-service';
import * as dotenv from 'dotenv';
import { SubjectService } from '../subject/subject.service';
import { SubjectDbService } from '../subject/subject.db-service';
import { TeacherService } from '../teacher/teacher.service';
import { TeacherDbService } from '../teacher/teacher.db-service';
import { GradeService } from '../grade/grade.service';
import { GradeDBService } from '../grade/grade.db-service';

export class ExpressApplication {
    private allowedMainOrigin!: string;
    private expressRouter!: ExpressRouter;
    private port!: string;
    private server!: ExpressServer;
    private userService!: UserService;
    private authService!: AuthService;
    private studentService!: StudentService;
    private subjectService!: SubjectService;
    private teacherService!: TeacherService;
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
    }

    private configureEnvironment(): void {
        dotenv.config({
            path: '.env',
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
        this.userService = new UserDbService();
        this.authService = new AuthDbService();
        this.studentService = new StudentDbService();
        this.subjectService = new SubjectDbService();
        this.teacherService = new TeacherDbService();
        this.gradeService = new GradeDBService();
    }

    private configureExpressRouter(): void {
        this.expressRouter = new ExpressRouter(
            this.userService,
            this.authService,
            this.studentService,
            this.subjectService,
            this.teacherService,
            this.gradeService,
        );
    }

    private configureServer(): void {
        this.server = new ExpressServer(
            this.allowedMainOrigin,
            this.expressRouter,
            this.port,
        );
    }
}
