export abstract class MySchoolError extends Error {
    public readonly code: number;

    constructor(message: string, code: number) {
        super(message);
        this.name = 'NotFoundError';
        this.code = code;
    }
}
