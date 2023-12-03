import { Router } from 'express';
import { GradeController } from './grade.controller';

export class GradeRouter {
    router = Router();

    constructor(private gradeController: GradeController) {
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.get('/:id', async (req, res, next) => {
            try {
                const result = await this.gradeController.getById(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
    

        this.router.post('/add', (req, res, next) => {
            try {
                const { id_student, id_subject, id_teacher, value } = req.body;
                const result = this.gradeController.add(id_student, id_subject, id_teacher, value);
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

        this.router.put('/:ids/:ide', async (req, res, next) => {
            try {
                const studentId = parseInt(req.params.ids);
                const subjectId = parseInt(req.params.ide);
                const newValue = req.body.value;
        
                if (isNaN(studentId) || isNaN(subjectId)) {
                    res.status(400).json({ error: 'Invalid studentId or subjectId' });
                    return;
                }
        
                const result = await this.gradeController.updatevalue(studentId, subjectId, newValue);
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
    }
}
