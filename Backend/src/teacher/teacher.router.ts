import { Router } from 'express';
import { TeacherController } from './teacher.controller';

export class TeacherRouter {
    router = Router();

    constructor(private teacherController: TeacherController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.post('/', async (req, res, next) => {
            const { name, email, subjectId, password } = req.body;

            try {
                const result = await this.teacherController.add(
                    name,
                    email,
                    subjectId,
                    password,
                );

                res.json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.get('/', async (req, res, next) => {
            try {
                const result = await this.teacherController.getAll();

                res.json(result);
            } catch (error: unknown) {
                throw error;
            }
        });

        this.router.get('/:id', async (req, res, next) => {
            const id = +req.params.id;

            try {
                const result = await this.teacherController.getById(id);

                res.json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.put('/:id', async (req, res, next) => {
            const id = +req.params.id;
            const { name, email, subjectId, password } = req.body;

            try {
                const result = await this.teacherController.update(
                    id,
                    name,
                    email,
                    subjectId,
                    password,
                );

                res.json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        //     const id = +req.params.id;

        //     try {
        //         await this.subjectController.delete(id);

        //         res.json({
        //             success: true,
        //             message: 'Subject deleted successfully.',
        //         });
        //     } catch (error: unknown) {
        //         next(error);
        //     }
        // });
    }
}
