import { Grade } from './grade';
import { GradeService } from './grade.service';
import jwt from 'jsonwebtoken';
import { query } from 'express';
import { ExpressDb } from '../infrastructure/express-db';

import bcrypt from 'bcrypt';

export class GradeDataService implements GradeService {
    private grades: Grade[] = [];

    async add(id_student: number, id_subject: number, id_teacher: number, value: number): Promise<Grade> {
        try {
            const newGrade: Grade = {
                id_student,
                id_subject,
                id_teacher,
                value
            };
    
            const query = `INSERT INTO grades (id_student, id_subject, id_teacher, value) VALUES ('${id_student}', '${id_subject}', '${id_teacher}', '${value}')`;
            const result = await ExpressDb.execute(query);
    
            console.log('Grade successfully added');
            return newGrade;
        } catch (error) {
            console.error('Error when inserting grade.');
            throw error;
        }
    }
   

    

    async getById(id: number): Promise<Grade | null> {
        const query = 'SELECT * FROM grades WHERE id_student = ?';
        const results = await ExpressDb.execute(query, [id]);
    
        if (results && results.length > 0) {
            return results;
        }
    
        return null;
    }
   

    
    delete(id: number): void {
        this.grades = this.grades.filter(grade => grade.id_student !== id);
    }
   

    async updatevalue(ids: number, ide: number, newvalue: number): Promise<Grade | null> {
        try {
            const query = `UPDATE grades SET value = ? WHERE id_student = ? AND id_subject = ?`;
            const result = await ExpressDb.execute(query, [newvalue, ids, ide]);
    
            if (result && result.affectedRows !== undefined && result.affectedRows > 0) {
                console.log('Update OK');
                const updatedUser: Grade = {
                    id_student: ids,
                    id_subject: ide,
                    id_teacher: 0, // Replace with the actual value
                    value: Number(newvalue)
                };
                return updatedUser;
            } else {
                console.log('User not found');
                return null;
            }
        } catch (error) {
            console.error('Error updating user password:', error);
            throw error;
        }
    }


}
