import { ExpressDb } from '../infrastructure/express-db';
import { Teacher } from './teacher';
import { TeacherService } from './teacher.service';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class TeacherDataService implements TeacherService {
    async login(email: string, password: string): Promise<string | null> {
        try {
            const query = `SELECT * FROM admins WHERE email = ?`;
            const result = await ExpressDb.execute(query, [email]);

            if (result && Array.isArray(result) && result.length > 0) {
                const teacher: Teacher = result[0];

                const isPasswordValid = await bcrypt.compare(
                    password,
                    teacher.password,
                );

                if (isPasswordValid) {
                    const token = jwt.sign(
                        { email: teacher.email },
                        'your-secret-key',
                        { expiresIn: '1h' },
                    );
                    return token;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error authenticating user:', error);
            throw error;
        }
    }
    async add(name: string, email: string, password: string): Promise<Teacher> {
        try {
            const hashedPassword = await this.hashPassword(password);
            // install bcrypt to crypt password

            const Teacher = {
                name: name,
                email: email,
                password: hashedPassword,
            };
            const query = `INSERT INTO admins (name, email, password) VALUES ('${name}', '${email}', '${hashedPassword}')`;
            const result = await ExpressDb.execute(query);

            console.log('Teacher successfully added');
            return Teacher;
        } catch (error) {
            console.error('Error when inserting Teacher.');
            throw error;
        }
    }

    async updatePassword(
        email: string,
        newPassword: string,
    ): Promise<Teacher | null> {
        try {
            const hashedPassword = await this.hashPassword(newPassword);

            const query = `UPDATE admins SET password = ? WHERE email = ?`;
            const result = await ExpressDb.execute(query, [
                hashedPassword,
                email,
            ]);

            if (
                result &&
                result.affectedRows !== undefined &&
                result.affectedRows > 0
            ) {
                console.log('Update OK');
                const updatedTeacher: Teacher = {
                    name: '',
                    email: email,
                    password: newPassword,
                };
                return updatedTeacher;
            } else {
                console.log('Teacher not found');
                return null;
            }
        } catch (error) {
            console.error('Error updating Teacher password:', error);
            throw error;
        }
    }

    async getAllEmail(): Promise<String[] | null> {
        const query = `SELECT email FROM admins`;

        try {
            const result = await ExpressDb.execute(query);

            if (result && Array.isArray(result)) {
                console.log('OK email');
                console.log(result);
                const emails = result.map((row: any) => row.email);
                return emails;
            } else {
                console.log('No email');
                return null;
            }
        } catch (error) {
            console.error(
                'Erreur lors de la récupération des adresses e-mail des utilisateurs. ',
                error,
            );
            throw error;
        }
    }

    async delete(email: string): Promise<string> {
        const query = `DELETE FROM admins WHERE email = '${email}'`;

        try {
            const result = await ExpressDb.execute(query);

            if (
                result &&
                result.affectedRows !== undefined &&
                result.affectedRows > 0
            ) {
                return 'Teacher deleted successfully';
            }
            return "Teacher does'nt exist";
        } catch (error) {
            console.error('Error checking and deleting e-mail :', error);
            throw error;
        }
    }

    async getByEmail(email: string): Promise<Teacher | null> {
        const query = 'SELECT * FROM admins WHERE email = ?';
        const result = await ExpressDb.execute(query, [email]);

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
