import { Router } from 'express';
import { GradeController } from './grade.controller';

export class GradeRouter {
    router = Router();

    constructor(private gradeController: GradeController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.post('/', async (req, res, next) => {
            let { studentId, subjectId, value } = req.body;
            studentId = +studentId;
            subjectId = +subjectId;
            value = +value;

            try {
                const result = await this.gradeController.add(
                    studentId,
                    subjectId,
                    value,
                );

                res.json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.get('/', async (req, res, next) => {
            try {
                const result = await this.gradeController.getAll();

                res.json(result);
            } catch (error: unknown) {
                throw error;
            }
        });

        this.router.get('/:studentId', async (req, res, next) => {
            const id = +req.params.studentId;

            try {
                const result = await this.gradeController.getByStudentId(id);

                res.json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.get('/:studentId/:subjectId', async (req, res, next) => {
            const studentId = +req.params.studentId;
            const subjectId = +req.params.subjectId;

            try {
                const result =
                    await this.gradeController.getByStudentAndSubject(
                        studentId,
                        subjectId,
                    );

                res.json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.put('/:studentId/:subjectId', async (req, res, next) => {
            const studentId = +req.params.studentId;
            const subjectId = +req.params.subjectId;
            const value = +req.body.value;

            try {
                const result = await this.gradeController.update(
                    studentId,
                    subjectId,
                    value,
                );

                res.json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.delete('/:studentId/:subjectId', async (req, res, next) => {
            const studentId = +req.params.studentId;
            const subjectId = +req.params.subjectId;

            try {
                await this.gradeController.delete(studentId, subjectId);

                res.json({
                    success: true,
                    message: 'Grade deleted successfully.',
                });
            } catch (error: unknown) {
                next(error);
            }
        });
    }
}
