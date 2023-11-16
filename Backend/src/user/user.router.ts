import { Router } from 'express';
import { UserController } from './user.controller';

export class UserRouter {
    router = Router();

    constructor(private userController: UserController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {

        this.router.post('/add-user', async (req, res, next) => {
            try {
                await this.userController.add(req.body.name, req.body.email, req.body.password);
                res.status(200).json();
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.put('/:email', async (req, res, next) => {
            try {
                await this.userController.updatePassword(req.params.email, req.body.password);;
                res.status(200).json();
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.get('/', async (req, res, next) => {
            try {
              const result = await this.userController.getAllEmail();
              res.status(200).json(result);
            } catch (error) {
              next(error);
            }
        });

        this.router.delete('/:email', async (req, res, next) => {
            try {
                await this.userController.delete(req.params.email);
                res.status(200).json();
            } catch (error: unknown) {
                next(error);
            }
        });
    }
}
