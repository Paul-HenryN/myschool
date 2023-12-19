import { Router } from 'express';
import { AdminController } from './admin.controller';

export class AdminRouter {
    router = Router();

    constructor(private adminController: AdminController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.post('/', async (req, res, next) => {
            const { name, email, password } = req.body;

            try {
                const result = await this.adminController.add(
                    name,
                    email,
                    password,
                );

                res.json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.get('/', async (req, res, next) => {
            try {
                const result = await this.adminController.getAll();

                res.json(result);
            } catch (error: unknown) {
                throw error;
            }
        });

        this.router.get('/:id', async (req, res, next) => {
            const id = +req.params.id;

            try {
                const result = await this.adminController.getById(id);

                res.json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
    }
}
