import { Router } from 'express';
import { SubjectController } from './subject.controller';
import { authenticateUser } from '../authentification/authMiddleware';

export class SubjectRouter {
    router = Router();

    constructor(private subjectController: SubjectController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.post(
            '/add-subject',
            authenticateUser,
            async (req, res, next) => {
                try {
                    const subject = await this.subjectController.add(
                        req.body.name,
                        req.body.coefficient,
                    );
                    res.status(200).json(subject);
                } catch (error: unknown) {
                    next(error);
                }
            },
        );

        this.router.get('/:id', async (req, res, next) => {
            const id = parseInt(req.params.id);

            try {
                const subject = await this.subjectController.getById(id);

                res.status(200).json(subject);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.get('/', async (req, res, next) => {
            try {
                const subjects = await this.subjectController.getAll();

                res.status(200).json(subjects);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.put('/:id', authenticateUser, async (req, res, next) => {
            const id = parseInt(req.params.id);

            try {
                const subject = await this.subjectController.update(
                    id,
                    req.body.name,
                    req.body.coefficient,
                );
                res.status(200).json(subject);
            } catch (error: unknown) {
                next(error);
            }
        });

        // this.router.get('/', authenticateUser, async (req, res, next) => {
        //     try {
        //         const result = await this.subjectController.getAllSubject();
        //         res.status(200).json(result);
        //     } catch (error) {
        //         next(error);
        //     }
        // });

        this.router.delete('/:id', authenticateUser, async (req, res, next) => {
            const id = parseInt(req.params.id);
            try {
                await this.subjectController.delete(id);
                res.status(200).json();
            } catch (error: unknown) {
                next(error);
            }
        });
    }
}
