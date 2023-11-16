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
            // Hash the new password
            const hashedPassword = await this.hashPassword(newPassword);
    
            // Update the user with the new password based on the email
            const query = `UPDATE admins SET password = ? WHERE email = ?`;
            const result = await ExpressDb.execute(query, [hashedPassword, email]);
    
            // Check if any rows were affected, indicating a successful update
            if (result.affectedRows > 0) {
                // Return an object with the updated email
                const updatedUser: User = { name: '', email: email, password: hashedPassword };
                console.log('Update OK');
                return updatedUser;
            } else {
                // No rows were affected, indicating that the user with the given email doesn't exist
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
      
            if (result.affectedRows > 0) {
                return 'User deleted successfully';
            }
            return 'User does\'nt exist';
        } catch (error) {
            console.error('Error checking and deleting e-mail :', error);
            throw error;
        }
    }

    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10); 
    }
    
}
