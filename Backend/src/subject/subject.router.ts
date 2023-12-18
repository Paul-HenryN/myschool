import { Router } from 'express';
import { SubjectController } from './subject.controller';

export class SubjectRouter {
    router = Router();

    constructor(private subjectController: SubjectController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.post('/', async (req, res, next) => {
            const { name, coefficient } = req.body;

            try {
                const result = await this.subjectController.add(
                    name,
                    coefficient,
                );

                res.json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.get('/', async (req, res, next) => {
            try {
                const result = await this.subjectController.getAll();

                res.json(result);
            } catch (error: unknown) {
                throw error;
            }
        });

        this.router.get('/:id', async (req, res, next) => {
            const id = +req.params.id;

            try {
                const result = await this.subjectController.getById(id);

                res.json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.put('/:id', async (req, res, next) => {
            const id = +req.params.id;
            const { name, coefficient } = req.body;

            try {
                const result = await this.subjectController.update(
                    id,
                    name,
                    coefficient,
                );

                res.json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.delete('/:id', async (req, res, next) => {
            const id = +req.params.id;

            try {
                await this.subjectController.delete(id);

                res.json({
                    success: true,
                    message: 'Subject deleted successfully.',
                });
            } catch (error: unknown) {
                next(error);
            }
        });
    }
}
