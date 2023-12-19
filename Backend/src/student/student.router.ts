import { Router } from 'express';
import { StudentController } from './student.controller';

export class StudentRouter {
    router = Router();

    constructor(private studentController: StudentController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.post('/', async (req, res, next) => {
            const { name, email, password } = req.body;

            try {
                const result = await this.studentController.add(
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
                const result = await this.studentController.getAll();

                res.json(result);
            } catch (error: unknown) {
                throw error;
            }
        });

        this.router.get('/:id', async (req, res, next) => {
            const id = +req.params.id;

            try {
                const result = await this.studentController.getById(id);

                res.json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
    }
}
