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

    async getById(id: number): Promise<Subject> {
        try {
            if (!id || isNaN(id) || id < 0) {
                throw new Error('Invalid id');
            }

            const subject = await this.subjectService.getById(id);
            return subject;
        } catch (error: unknown) {
            throw error;
        }
    }

    async getAll(): Promise<Subject[]> {
        try {
            const subjects = await this.subjectService.getAll();
            return subjects;
        } catch (error: unknown) {
            throw error;
        }
    }

    update(
        id: number,
        newName: string,
        newCoefficient: number,
    ): Promise<Subject> {
        try {
            if (!id || isNaN(id) || id < 0) {
                throw new Error('Invalid id');
            }

            if (!newName || !newCoefficient) {
                throw new Error('Name, coefficient are required');
            }
            return this.subjectService.update(id, newName, newCoefficient);
        } catch (error) {
            throw error;
        }
    }

    // getAllSubject(): Promise<String[] | null> {
    //     return this.subjectService.getAllSubject();
    // }

    async delete(id: number): Promise<void> {
        return await this.subjectService.delete(id);
    }
}
