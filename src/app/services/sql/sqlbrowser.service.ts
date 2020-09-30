import { Injectable } from '@angular/core';

import { ISQL } from './sql.interface';

@Injectable({
	providedIn: 'root'
})
export class SqlbrowserService implements ISQL {

	private sqlDB: string = "breaker.db";
	private version: string = "0.1";

	constructor() { }

	public Initialize(): Promise<boolean> {
		console.info("using sql browser service");
		return new Promise((resolve, reject) => {
			resolve(true);
		});
	}

	public getDb(): Promise<any> {
		return new Promise((resolve, reject) => {
			const size = 2 * 1024 * 1024;
			try {
				let db = (<any> window).openDatabase(this.sqlDB, this.version, this.sqlDB, size);
				db.transaction(tx => resolve(tx));
			} catch(err) { reject(err); }
		});
	}

	public executeSQL(query: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.getDb().then(db => {
				db.executeSql(query, [], (tr, data) => {
					console.info("query executed: ", {
						query: query,
						tr: tr,
						data: data,
					});
					resolve(data);
				}, (tr, err) => {
					console.error("error on execution: ", {
						query: query, 
						error: err,
					});
					reject(err);
				});
			});
		})
	}

	public selectSQL(query: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.executeSQL(query)
				.then((data) => {
					resolve(data.rows);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

}
