import { Router } from 'express';
import { UserController } from '../user/user.controller';
import { UserRouter } from '../user/user.router';
import { UserService } from '../user/user.service';
import { AuthRouter } from '../auth/auth.router';
import passport from 'passport';

export class ExpressRouter {
    router = Router();

    private userController!: UserController;
    private userRouter!: UserRouter;
    private authRouter!: AuthRouter;

    constructor(private userService: UserService) {
        this.configureControllers();
        this.configureRouters();
        this.configureRoutes();
    }

    private configureControllers(): void {
        this.userController = new UserController(this.userService);
    }

    private configureRouters(): void {
        this.userRouter = new UserRouter(this.userController);
        this.authRouter = new AuthRouter();
    }

    private configureRoutes(): void {
        this.router.use(
            '/users',
            passport.authenticate('jwt', { session: false }),
            this.userRouter.router,
        );
        this.router.use(this.authRouter.router);
    }
}
