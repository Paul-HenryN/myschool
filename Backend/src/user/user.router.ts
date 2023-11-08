import { Router } from 'express';
import { UserController } from './user.controller';

export class UserRouter {
    router = Router();

    constructor(private userController: UserController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {

        this.router.post('/add-user', (req, res, next) => {
            try {
                const result = this.userController.add(req.body.name, req.body.email, req.body.password);
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.get('/', async (req, res, next) => {
            try {
              const result = await this.userController.getAll();
              res.status(200).json(result);
            } catch (error) {
              next(error);
            }
        });

        this.router.delete('/:id', (req, res, next) => {
            try {
                this.userController.delete(parseInt(req.params.id));
                res.status(200).json();
            } catch (error: unknown) {
                next(error);
            }
        });
    }
}
