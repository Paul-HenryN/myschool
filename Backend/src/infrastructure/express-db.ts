import mysql, { Connection } from 'mysql';

export class ExpressDb {
    private connection!: Connection;

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
        this.connection = mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: database,
        });
    }

    executeQuery(query: string) {
        this.connection.connect();

        this.connection.query(query, (err, rows, fields) => {
            if (err) throw err;
            console.log(rows);
        });

        this.connection.end();
    }
}
