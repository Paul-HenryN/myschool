import { Router } from 'express';
import { StudentController } from './student.controller';

export class StudentRouter {
    router = Router();

    constructor(private studentController: StudentController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.get('/:id', (req, res, next) => {
            try {
                const result = this.studentController.getById(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.post('/add-user', (req, res, next) => {
            try {
                const result = this.studentController.add(req.body.name, req.body.email, req.body.password);
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.delete('/:id', (req, res, next) => {
            try {
                this.studentController.delete(parseInt(req.params.id));
                res.status(200).json();
            } catch (error: unknown) {
                next(error);
            }
        });
    }
}
