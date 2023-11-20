import { User } from './user';
import { UserService } from './user.service';

export class UserController {
    constructor(private userService: UserService) {}

    async add(name: string, email: string, password: string): Promise<User> {
        try {
            // Vérification de la présence du nom, de l'email et du mot de passe
            if (!name || !email || !password) {
                throw new Error('Name, email, and password are required');
            }

            // Vérification de la validité de l'email
            const emailRegex = /^[A-Za-z0-9._%-]+@myschool\.net$/;
            if (!emailRegex.test(email)) {
                throw new Error('Invalid email format');
            }

            // Vérification si l'email existe déjà
            const existingUser = await this.userService.getByEmail(email);
            if (existingUser) {
                throw new Error('Email already exists');
            }

            // Si toutes les vérifications passent, appeler le service pour ajouter l'utilisateur
            return await this.userService.add(name, email, password);
        } catch (error) {
            throw error;
        }
    }

    updatePassword(email: string, password: string): Promise<User | null> {
        try{
            if (!password) {
                throw new Error('password are required');
            }
            return this.userService.updatePassword(email, password);
        } catch (error) {
            throw error;
        }
    }
    
    getAllEmail(): Promise<String[] | null> {
        return this.userService.getAllEmail();
    }

    delete(email: string): Promise<string> {
        return this.userService.delete(email);
    }

    async login(email: string, password: string):  Promise<string | null> {
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

            return this.userService.login(email, password);
        } catch (error) {
            throw error;
        }
    }
}
