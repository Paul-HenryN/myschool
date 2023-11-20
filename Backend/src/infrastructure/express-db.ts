/*import mysql, { Connection } from 'mysql';

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
}*/

import mysql, { Pool } from 'mysql';

export class ExpressDb {

    private static pool: Pool;

    constructor(
      private host: string,
      private user: string,
      private password: string,
      private database: string,
    ) {
      ExpressDb.pool = mysql.createPool({
        host: this.host,
        user: this.user,
        password: this.password,
        database: this.database,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
    }
    /*private static pool = mysql.createPool({
        host: 'localhost',
        user: 'your_user',
        password: 'your_password',
        database: 'your_database',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });*/

    static execute(query: string, values?: any[]): Promise<any> {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                    return;
                }

                connection.query(query, values, (error, results) => {
                    connection.release();

                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
        });
    }
}

