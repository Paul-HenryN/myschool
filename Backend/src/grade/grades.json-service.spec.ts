import { Grade } from './grade';
import { GradeDataService } from './grade.data-service';

describe('GradeDataService', () => {
    let service: GradeDataService;

    beforeEach(() => {
        service = new GradeDataService();
    });

    it('should add a grade', () => {
        const grade = service.add(1, 2, 2, 2.5);
        expect(grade).toEqual(new Grade(1, 2, 2, 2.5));
    });

    it('should get a grade by id', () => {
        service.add(1, 2, 2, 2.5);
        const grade = service.getById(1);
        expect(grade).toEqual(new Grade(1, 2, 2, 2.5));
    });

    it('should delete a grade by id', () => {
        service.add(1, 2, 2, 2.5);
        service.delete(1);
        const grade = service.getById(1);
        expect(grade).toBeNull();
    });
});