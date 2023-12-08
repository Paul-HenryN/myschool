import { Teacher } from './teacher';
import { TeacherService } from './teacher.service';

export class TeacherController {
    constructor(private TeacherService: TeacherService) {}

    async add(
        name: string,
        email: string,
        password: string,
        subjectId: number,
    ): Promise<Teacher> {
        try {
            // Vérification de la présence du nom, de l'email et du mot de passe
            if (!name || !email || !password || !subjectId) {
                throw new Error(
                    'Name, email, subject id and password are required',
                );
            }

            // Vérification de la validité de l'email
            const emailRegex = /^[A-Za-z0-9._%-]+@myschool\.net$/;
            if (!emailRegex.test(email)) {
                throw new Error('Invalid email format');
            }

            // Vérification si l'email existe déjà
            const existingTeacher = await this.TeacherService.getByEmail(email);
            if (existingTeacher) {
                throw new Error('Email already exists');
            }

            // Si toutes les vérifications passent, appeler le service pour ajouter l'utilisateur
            return await this.TeacherService.add(
                name,
                email,
                password,
                subjectId,
            );
        } catch (error) {
            throw error;
        }
    }

    updatePassword(email: string, password: string): Promise<Teacher | null> {
        try {
            if (!password) {
                throw new Error('password are required');
            }
            return this.TeacherService.updatePassword(email, password);
        } catch (error) {
            throw error;
        }
    }

    getAllEmail(): Promise<String[] | null> {
        return this.TeacherService.getAllEmail();
    }

    delete(email: string): Promise<string> {
        return this.TeacherService.delete(email);
    }

    async login(email: string, password: string): Promise<string | null> {
        try {
            // Vérification de la présence du nom, de l'email et du mot de passe
            if (!email || !password) {
                throw new Error('Name, email, and password are required');
            }

            // Vérification de la validité de l'email
            const emailRegex = /^[A-Za-z0-9._%-]+@myschool\.net$/;
            if (!emailRegex.test(email)) {
                throw new Error('Invalid email format');
            }

            return this.TeacherService.login(email, password);
        } catch (error) {
            throw error;
        }
    }
}
