import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

import { ISQL } from './sql.interface';

@Injectable({
	providedIn: 'root'
})
export class SqliteService implements ISQL {

	private sqlDB: string = "breaker.db";

	constructor(
		private sqlite: SQLite
	) { }

	public Initialize(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.createTables()
				.then(data => {
					console.info("db initialized ", data);
					resolve(true);
				})
				.catch(err => console.error(err));
		});
	}

	public getDb(): Promise<SQLiteObject> {
		return this.sqlite.create({
			name: this.sqlDB,
			location: 'default',
		});
	}

	public createTables(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const query = 'create table breakers(name VARCHAR(32), category VARCHAR(32), id VARCHAR(32))';
			this.executeSQL(query)
				.then(data => resolve(true));
		});
	}

	public executeSQL(query: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.getDb()
				.then((db: SQLiteObject) => {
					db.executeSql(query)
						.then(data => resolve(data))
						.catch(err => reject(err));
				});
		});
	}

	public selectSQL(query: string): Promise<any> {
		return new Promise((resolve, reject) => {
			resolve(null);
		});
	}

}
