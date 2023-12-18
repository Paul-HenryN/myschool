import { ExpressDb } from '../infrastructure/express-db';
import { Subject } from './subject';
import { SubjectService } from './subject.service';

export class SubjectDataService implements SubjectService {
    async getAll(): Promise<Subject[]> {
        try {
            const query = 'SELECT * FROM subjects';
            const result = await ExpressDb.execute(query);

            console.log(JSON.stringify(result));
            return result.map((subject: any) => {
                return {
                    id: subject.id_subject,
                    name: subject.name,
                    coefficient: subject.coefficient,
                };
            });
        } catch (error: unknown) {
            throw error;
        }
    }

    async add(name: string, coefficient: number): Promise<Subject> {
        try {
            const query =
                'INSERT INTO subjects (name, coefficient) VALUES (?, ?)';
            const result = await ExpressDb.execute(query, [name, coefficient]);

            console.log(result);
            return {
                id: result.insertId,
                name: name,
                coefficient: coefficient,
            };
        } catch (error) {
            console.error('Error when inserting subject.');
            throw error;
        }
    }

    async getById(id: number): Promise<Subject> {
        try {
            const query = 'SELECT * FROM subjects WHERE id_subject = ?';
            const result = await ExpressDb.execute(query, [id]);

            if (result.length === 0) {
                throw new Error('Not found');
            }

            const { id_subject, name, coefficient } = result[0];

            console.log(JSON.stringify(result));
            return {
                id: id_subject,
                name,
                coefficient,
            };
        } catch (error: unknown) {
            throw error;
        }
    }
    async update(
        id: number,
        newName: string,
        newCoefficient: number,
    ): Promise<Subject> {
        try {
            const query =
                'UPDATE subjects SET name = ?, coefficient = ? WHERE id_subject = ?';

            const result = await ExpressDb.execute(query, [
                newName,
                newCoefficient,
                id,
            ]);

            console.log(result);
            return { id, name: newName, coefficient: newCoefficient };
        } catch (error: unknown) {
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const query = 'DELETE FROM subjects WHERE id_subject = ?';
            await ExpressDb.execute(query, [id]);
        } catch (error: unknown) {
            throw error;
        }
    }
}
