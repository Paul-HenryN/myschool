import jwt from 'jsonwebtoken';
import { query } from 'express';
import { ExpressDb } from '../infrastructure/express-db';
import { Subject } from './subject';
import { SubjectService } from './subject.service';

export class SubjectDataService implements SubjectService {
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

    getByid(id: number): Promise<Subject> {
        throw new Error('Method not implemented.');
    }
    update(id: number, newName: string, newCoefficient: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    delete(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
