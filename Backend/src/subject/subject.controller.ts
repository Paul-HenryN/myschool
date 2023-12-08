import { Subject } from './subject';
import { SubjectService } from './subject.service';

export class SubjectController {
    constructor(private userService: SubjectService) {}

    async add(name: string, teacher: string): Promise<Subject> {
        try {
            // Vérification de la présence du nom, de l'email et du mot de passe
            if (!name || !teacher ) {
                throw new Error('Name, teacher are required');
            }

            // Vérification si la matiere existe déjà
            const existingUser = await this.userService.getByName(name);
            if (existingUser) {
                throw new Error('Name already exists');
            }

            // Si toutes les vérifications passent, appeler le service pour ajouter l'utilisateur
            return await this.userService.add(name, teacher);
        } catch (error) {
            throw error;
        }
    }

    updateTeacher(name: string, teacher: string): Promise<Subject | null> {
        try{
            if (!teacher) {
                throw new Error('teacher are required');
            }
            return this.userService.updateTeacher(name, teacher);
        } catch (error) {
            throw error;
        }
    }
    
    getAllSubject(): Promise<String[] | null> {
        return this.userService.getAllSubject();
    }

    delete(name: string): Promise<string> {
        return this.userService.delete(name);
    }
}
