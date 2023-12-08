import jwt from 'jsonwebtoken';
import { query } from 'express';
import { ExpressDb } from '../infrastructure/express-db';
import { Subject } from './subject';
import { SubjectService } from './subject.service';
import bcrypt from 'bcrypt';


export class SubjectDataService implements SubjectService {
    
    async add(name: string, teacher: string): Promise<Subject> {
        try {

            const Subject = {name: name, teacher: teacher};
            const query = `INSERT INTO subjects (name, teacher) VALUES ('${name}', '${teacher}')`;
            const result = await ExpressDb.execute(query);

            console.log('User successfully added');
            return Subject;
        } catch (error) {
            console.error('Error when inserting user.');
            throw error;
        }
    }

    async updateTeacher(name: string, teacher: string): Promise<Subject | null> {
        try {
  
            const query = `UPDATE subjects SET password = ? WHERE name = ?`;
            const result = await ExpressDb.execute(query, [name, teacher]);
    
            if (result && result.affectedRows !== undefined && result.affectedRows > 0) {
                console.log('Update OK');
                const updatedTeacher: Subject = { name: name, teacher: teacher };
                return updatedTeacher;
            } else {
                console.log('Subject not found');
                return null;
            }
        } catch (error) {
            console.error('Error updating user password:', error);
            throw error;
        }
    }
    
    async getAllSubject(): Promise<String[] | null> {
        const query = `SELECT name FROM subjects`;
    
        try {
            const result = await ExpressDb.execute(query);
    
            if (result && Array.isArray(result)) {
                console.log('OK Subject');
                console.log(result);
                const names = result.map((row: any) => row.name);
                return names;
            } else {
                console.log('No Subject');
                return null;
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des adresses cours. ', error);
            throw error;
        }
    }
    
    async delete(name: string): Promise<string> {
        const query = `DELETE FROM admins WHERE name = '${name}'`;

        try {
            const result = await ExpressDb.execute(query);
      
            if (result && result.affectedRows !== undefined && result.affectedRows > 0) {
                return 'Subject deleted successfully';
            }
            return 'Subject does\'nt exist';
        } catch (error) {
            console.error('Error checking and deleting name :', error);
            throw error;
        }
    }

    async getByName(name: string): Promise<Subject | null> {
        const query = 'SELECT * FROM subjects  WHERE name = ?';
        const result = await ExpressDb.execute(query, [name]);

        // Vérifiez si un utilisateur a été trouvé
        if (result && Array.isArray(result) && result.length > 0) {
            return result[0]; // Retourne le premier utilisateur trouvé
        }

        return null; // Aucun utilisateur trouvé avec cet email
    }

    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10); 
    }
    
}
