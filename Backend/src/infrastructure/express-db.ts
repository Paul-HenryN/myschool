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

    static execute(query: string): Promise<any> {
        return new Promise((resolve, reject) => {
          this.connection.connect();
          this.connection.query(query, (error, results) => {
            if (error) {
              reject(error); // En cas d'erreur, rejet de la promesse
            } else {
              resolve(results); // En cas de succès, résolution de la promesse avec les résultats
            }
            this.connection.end();
          });
        });
    }
}
