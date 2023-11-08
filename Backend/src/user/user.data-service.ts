import { query } from 'express';
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

    async getAll(): Promise<String[] | null> {
        const query = `SELECT email FROM admins`;
  
        try {
            const result = await ExpressDb.execute(query); // Attend la résolution de la promesse

            if (result !== null) {
                console.log(result);
                console.log('OK email');
                const emails = result.rows;
                return emails;
            } else {
                console.log('PAS d\'email');
                return null;
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des adresses e-mail des utilisateurs. ', error);
            throw error;
        }
    }

    async delete(email: string): Promise<string> {
        const query = `DELETE FROM admins WHERE email = '${email}'`;

        try {
            const result = await ExpressDb.execute(query);
      
            if (result.affectedRows > 0) {
                return 'User deleted successfully';
            } else {
                return 'User does\'nt exist';
            }
        } catch (error) {
            console.error('Erreur lors de la vérification et de la suppression de l\'e-mail :', error);
            throw error;
        }
    }

    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10); 
    }
}
