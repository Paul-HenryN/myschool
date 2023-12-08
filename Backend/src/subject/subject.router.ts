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

        // this.router.put('/:email', authenticateUser, async (req, res, next) => {
        //     try {
        //         await this.subjectController.updateTeacher(
        //             req.params.name,
        //             req.body.teacher,
        //         );
        //         res.status(200).json();
        //     } catch (error: unknown) {
        //         next(error);
        //     }
        // });

        // this.router.get('/', authenticateUser, async (req, res, next) => {
        //     try {
        //         const result = await this.subjectController.getAllSubject();
        //         res.status(200).json(result);
        //     } catch (error) {
        //         next(error);
        //     }
        // });

        // this.router.delete(
        //     '/:name',
        //     authenticateUser,
        //     async (req, res, next) => {
        //         try {
        //             await this.subjectController.delete(req.params.name);
        //             res.status(200).json();
        //         } catch (error: unknown) {
        //             next(error);
        //         }
        //     },
        // );
    }
}
