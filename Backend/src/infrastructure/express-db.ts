import mysql, { Connection } from 'mysql';
import { Teacher } from '../teacher/teacher';

export class ExpressDb {
    private static connection: Connection;

    constructor(
        host: string,
        user: string,
        password: string,
        database: string,
    ) {
        this.configureConnection(host, user, password, database);
    }

    private configureConnection(
        host: string,
        user: string,
        password: string,
        database: string,
    ): void {
        ExpressDb.connection = mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: database,
        });
    }

    static insertTeacher(username: string): void {
        try {
            const query = `INSERT INTO professeur VALUES(${username})`;
            this.connection.connect();

            this.connection.query(query, (err, rows, fiels) => {
                console.log(rows);
            });
        } catch (e) {
            console.error(e);
        }
    }
}
