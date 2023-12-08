import { Router } from 'express';
import { UserController } from './user.controller';

export class UserRouter {
    router = Router();

    constructor(private userController: UserController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.get('/:id', async (req, res, next) => {
            try {
                const result = await this.userController.getById(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.post('/add', async (req, res, next) => {
            const { email, name, password } = req.body;
            try {
                const result = await this.userController.add(
                    email,
                    name,
                    password,
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
    }
}
