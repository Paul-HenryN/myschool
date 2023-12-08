import { Subject } from './subject';
import { SubjectService } from './subject.service';

export class SubjectController {
    constructor(private subjectService: SubjectService) {}

    async add(name: string, coefficient: number): Promise<Subject> {
        try {
            // Vérification de la présence du nom et du coefficient
            if (!name || !coefficient) {
                throw new Error('Name, coefficient are required');
            }

            // // Vérification si la matiere existe déjà
            // const existingUser = await this.subjectService.getByName(name);
            // if (existingUser) {
            //     throw new Error('Name already exists');
            // }

            // Si toutes les vérifications passent, appeler le service pour ajouter l'utilisateur
            return await this.subjectService.add(name, coefficient);
        } catch (error) {
            throw error;
        }
    }

    // updateTeacher(name: string, teacher: string): Promise<Subject | null> {
    //     try {
    //         if (!teacher) {
    //             throw new Error('teacher are required');
    //         }
    //         return this.subjectService.update(name, teacher);
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // getAllSubject(): Promise<String[] | null> {
    //     return this.subjectService.getAllSubject();
    // }

    // delete(name: string): Promise<string> {
    //     return this.subjectService.delete(name);
    // }
}
