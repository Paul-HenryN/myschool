import mysql, { Connection } from 'mysql';

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

    static execute(query: string) {
        this.connection.connect();
        this.connection.query(query);
        this.connection.end();
    }
}
