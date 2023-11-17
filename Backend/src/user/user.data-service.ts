import jwt from 'jsonwebtoken';
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

            console.log('User successfully added');
            return user;
        } catch (error) {
            console.error('Error when inserting user.');
            throw error;
        }
    }

    async updatePassword(email: string, newPassword: string): Promise<User | null> {
        try {
            const hashedPassword = await this.hashPassword(newPassword);
    
            const query = `UPDATE admins SET password = ? WHERE email = ?`;
            const result = await ExpressDb.execute(query, [hashedPassword, email]);
    
            if (result && result.affectedRows !== undefined && result.affectedRows > 0) {
                console.log('Update OK');
                const updatedUser: User = { name: '', email: email, password: hashedPassword };
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
            console.error('Erreur lors de la récupération des adresses e-mail des utilisateurs. ', error);
            throw error;
        }
    }
    
    async delete(email: string): Promise<string> {
        const query = `DELETE FROM admins WHERE email = '${email}'`;

        try {
            const result = await ExpressDb.execute(query);
      
            if (result && result.affectedRows !== undefined && result.affectedRows > 0) {
                return 'User deleted successfully';
            }
            return 'User does\'nt exist';
        } catch (error) {
            console.error('Error checking and deleting e-mail :', error);
            throw error;
        }
    }

    async login(email: string, password: string): Promise<string | null> {
        try {
          const query = `SELECT * FROM admins WHERE email = ?`;
          const result = await ExpressDb.execute(query, [email]);
    
          if (result && Array.isArray(result) && result.length > 0) {
            const user: User = result[0];
    
            const isPasswordValid = await bcrypt.compare(password, user.password);
    
            if (isPasswordValid) {
              const token = jwt.sign({ email: user.email }, 'your-secret-key', { expiresIn: '1h' });
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

    async getByEmail(email: string): Promise<User | null> {
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
