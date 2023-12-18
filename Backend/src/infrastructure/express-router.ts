import { Router } from 'express';
import { UserController } from '../user/user.controller';
import { UserRouter } from '../user/user.router';
import { UserService } from '../user/user.service';
import { AuthRouter } from '../auth/auth.router';
import passport from 'passport';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { StudentController } from '../student/student.controller';
import { StudentRouter } from '../student/student.router';
import { StudentService } from '../student/student.service';
import { SubjectRouter } from '../subject/subject.router';
import { SubjectController } from '../subject/subject.controller';
import { SubjectService } from '../subject/subject.service';
import { TeacherController } from '../teacher/teacher.controller';
import { TeacherRouter } from '../teacher/teacher.router';
import { TeacherService } from '../teacher/teacher.service';
import { GradeController } from '../grade/grade.controller';
import { GradeRouter } from '../grade/grade.router';
import { GradeService } from '../grade/grade.service';

export class ExpressRouter {
    router = Router();

    private userController!: UserController;
    private userRouter!: UserRouter;
    private authRouter!: AuthRouter;
    private authController!: AuthController;
    private studentRouter!: StudentRouter;
    private studentController!: StudentController;
    private subjectRouter!: SubjectRouter;
    private subjectController!: SubjectController;
    private teacherController!: TeacherController;
    private teacherRouter!: TeacherRouter;
    private gradeController!: GradeController;
    private gradeRouter!: GradeRouter;

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private studentService: StudentService,
        private subjectService: SubjectService,
        private teacherService: TeacherService,
        private gradeService: GradeService,
    ) {
        this.configureControllers();
        this.configureRouters();
        this.configureRoutes();
    }

    private configureControllers(): void {
        this.userController = new UserController(this.userService);
        this.authController = new AuthController(this.authService);
        this.studentController = new StudentController(this.studentService);
        this.subjectController = new SubjectController(this.subjectService);
        this.teacherController = new TeacherController(this.teacherService);
        this.gradeController = new GradeController(this.gradeService);
    }

    private configureRouters(): void {
        this.userRouter = new UserRouter(this.userController);
        this.authRouter = new AuthRouter(this.authController);
        this.studentRouter = new StudentRouter(this.studentController);
        this.subjectRouter = new SubjectRouter(this.subjectController);
        this.teacherRouter = new TeacherRouter(this.teacherController);
        this.gradeRouter = new GradeRouter(this.gradeController);
    }

    private configureRoutes(): void {
        this.router.use(
            '/users',
            passport.authenticate('jwt', { session: false }),
            this.userRouter.router,
        );
        this.router.use(this.authRouter.router);
        this.router.use('/students', this.studentRouter.router);
        this.router.use('/subjects', this.subjectRouter.router);
        this.router.use('/teachers', this.teacherRouter.router);
        this.router.use('/grades', this.gradeRouter.router);
    }
}
