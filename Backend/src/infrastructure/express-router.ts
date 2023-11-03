import { Router } from 'express';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { UserRouter } from '../user/user.router';
import { TeacherService } from '../teacher/teacher.service';
import { TeacherController } from '../teacher/teacher.controller';
import { TeacherRouter } from '../teacher/teacher.router';
import { StudentService } from '../student/student.service';
import { StudentController } from '../student/student.controller';
import { StudentRouter } from '../student/student.router';
import { GradeService } from '../grade/grade.service';
import { GradeController } from '../grade/grade.controller';
import { GradeRouter } from '../grade/grade.router';


export class ExpressRouter {
    router = Router();

    private userController!: UserController;
    private userRouter!: UserRouter;

    private teacherRouter! : TeacherRouter;
    private teacherController! : TeacherController;
    
    private studentRouter! : StudentRouter;
    private studentController! : StudentController;

    private gradeRouter! : GradeRouter;
    private gradeController! : GradeController;    

    constructor(
        private userService: UserService, 
        private teacherService: TeacherService, 
        private studentService: StudentService,
        private gradeService: GradeService) {
        this.configureControllers();
        this.configureRouters();
        this.configureRoutes();
    }

    private configureControllers(): void {
        this.userController = new UserController(this.userService);
        this.teacherController = new TeacherController(this.teacherService);
        this.studentController = new StudentController(this.studentService);
        this.gradeController = new GradeController(this.gradeService);
    }

    private configureRouters(): void {
        this.userRouter = new UserRouter(this.userController);
        this.teacherRouter = new TeacherRouter(this.teacherController);
        this.studentRouter = new StudentRouter(this.studentController);
        this.gradeRouter = new GradeRouter(this.gradeController);
    }

    private configureRoutes(): void {
        this.router.use('/user', this.userRouter.router);
        this.router.use('/teacher', this.teacherRouter.router);
        this.router.use('/student', this.studentRouter.router);
        this.router.use('/grade', this.gradeRouter.router);
    }
}
