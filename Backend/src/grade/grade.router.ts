import { Router } from 'express';
import { GradeController } from './grade.controller';

export class GradeRouter {
    router = Router();

    constructor(private gradeController: GradeController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.get('/:id', (req, res, next) => {
            try {
                const result = this.gradeController.getById(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.post('/add-user', (req, res, next) => {
            try {
                const result = this.gradeController.add(req.body.username);
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.delete('/:id', (req, res, next) => {
            try {
                this.gradeController.delete(parseInt(req.params.id));
                res.status(200).json();
            } catch (error: unknown) {
                next(error);
            }
        });
    }
}
