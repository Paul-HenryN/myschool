import { Router } from 'express';
import { TeacherController } from './teacher.controller';

export class TeacherRouter {
    router = Router();

    constructor(private teacherController: TeacherController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.get('/:id', (req, res, next) => {
            try {
                const result = this.teacherController.getById(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.post('/add-user', (req, res, next) => {
            try {
                const result = this.teacherController.add(req.body.username);
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.delete('/:id', (req, res, next) => {
            try {
                this.teacherController.delete(parseInt(req.params.id));
                res.status(200).json();
            } catch (error: unknown) {
                next(error);
            }
        });
    }
}
