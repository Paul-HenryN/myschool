import { Subject } from '../subject/subject';
import { User } from '../user/user';

export class Teacher extends User {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public role: Object,
        public subject: Subject,
    ) {
        super(id, name, email, role);
    }
}
