import { Router } from 'express';
import { UserController } from './user.controller';

export class UserRouter {
    router = Router();

    constructor(private userController: UserController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.get('/', async (req, res, next) => {
            try {
                const result = await this.userController.getAll();

                res.send(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.get('/:id', async (req, res, next) => {
            try {
                const result = await this.userController.getById(
                    +req.params.id,
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.delete('/:id', async (req, res, next) => {
            const id = +req.params.id;
            try {
                await this.userController.delete(id);

                res.json({
                    success: true,
                    message: 'User deleted succesfully',
                });
            } catch (error: unknown) {
                next(error);
            }
        });
    }
}
