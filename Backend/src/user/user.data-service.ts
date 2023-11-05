import { ExpressDb } from '../infrastructure/express-db';
import { User } from './user';
import { UserService } from './user.service';
import bcrypt from 'bcrypt';


export class UserDataService implements UserService {
    async add(name: string, email: string, password: string): Promise<User> {
        try {
            const hashedPassword = await this.hashPassword(password); 
            // install bcrypt to crypt password

            const user = {name: name, email: email, password: hashedPassword};

            const query = `INSERT INTO admins (name, email, password) VALUES ('${name}', '${email}', '${hashedPassword}')`;

            const result = await ExpressDb.execute(query);

            console.log('Utilisateur ajouté avec succès');

            return user;
        } catch (error) {
            console.error('Erreur lors de l\'insertion de l\'utilisateur. ');
            throw error;
        }
    }
    getById(id: number): User | null {
        throw new Error('Method not implemented.');
    }
    delete(id: number): void {
        throw new Error('Method not implemented.');
    }

    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10); 
    }
}
