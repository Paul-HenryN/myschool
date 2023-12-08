import { Student } from './student';
import { StudentService } from './student.service';

import { ExpressDb } from '../infrastructure/express-db';

export class StudentDataService implements StudentService {

    private students: Student[] = [];
/*
    add(username: string): Student {
        throw new Error('Method not implemented.');
    }
    */

    


    async add (name: string, email: string, password: string): Promise<Student> {
        try {
            const newStudent: Student = {
                id: this.students.length + 1,
                name: name,
                email: email,
                password: password,
            };
    
    
            const query = `INSERT INTO students (name, email, password) VALUES ('${name}', '${email}', '${password}')`;
            const result = await ExpressDb.execute(query);
    
            console.log('Student successfully added');
            return newStudent;
        } catch (error) {
            console.error('Error when inserting Student.');
            throw error;
        }
    }
     

    /*
    getById(id: number): Student | null {
        const student = this.students.find((s) => s.id === id);
        return student || null;
    }
    */

    async getById(id: number): Promise<Student | null> {
        const query = 'SELECT * FROM students WHERE id_student = ?';
        const results = await ExpressDb.execute(query, [id]);
    
        if (results && results.length > 0) {
            return results;
        }
    
        return null;
    }

    async getAll():Promise<Student[]>  {
        const query = 'SELECT * FROM students';
        const results = await ExpressDb.execute(query);
    
        if (results && results.length > 0) {
            return results;
        } else {
            console.log('not found');
            return [];
         
        }
    }


    async update(id: number, name: string, email: string,): Promise<void> {
        try {
            const query = `UPDATE students SET name = ?, email = ? WHERE id_student = ? `;
            const result = await ExpressDb.execute(query, [name, email, id]);
            console.log(id);
    
            if (result && result.affectedRows !== undefined && result.affectedRows > 0) {
                console.log('Update OK');
                
              
            } else {
                console.log('student not found');
             
            }
        } catch (error) {
            console.error('Error updating Student password:', error);
            throw error;
        }
    }


    /*
    delete(id: number): void {
        throw new Error('Method not implemented.');
    }

    */

    delete(id: number): void {
        this.students = this.students.filter(student => student.id !== id);
    }

    
}
