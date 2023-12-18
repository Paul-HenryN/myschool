import { Student } from '../student/student';
import { Subject } from '../subject/subject';

export class Grade {
    constructor(
        public id: number,
        public student: Student,
        public subject: Subject,
        public value: number,
    ) {}
}
