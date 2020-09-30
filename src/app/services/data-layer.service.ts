import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoaderService } from './data/loader.service';
import { ISQL } from './sql/sql.interface';

import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class DataLayerService {

	public dbLoaded

	constructor(
		private Http: HttpClient,
		private Loader: LoaderService,
    @Inject('SQLService') private sqlService: ISQL,
	) { }

	public async InitializeDB(): Promise<any> {
		await this.sqlService.Initialize();
		try {
			const isUpdated = await this.checkVersion();
			if(!isUpdated) {
				console.error("data not updated! reseting...");
				await this.reset();
			} else {
				console.info("data is ok!");
			}
		} catch (err) {
			await this.reset();
			await this.InsertData();
		}
		return true;
	}

	public async createTables(): Promise<boolean> {
		try {
			await this.createBreakerTable();
			await this.createCategoriesTable();
			await this.createSetupTable();
			return true;
		} catch(err) {
			console.error("error creating tables ", err);
			return false;
		}
	}
	private createBreakerTable(): Promise<boolean> {
		const query = 'CREATE TABLE IF NOT EXISTS breakers ("id" INTEGER PRIMARY KEY AUTOINCREMENT, "hash" VARCHAR(32), "content" TEXT, "category" VARCHAR(32), "favorite" TINYINT(1))';
		return this.sqlService.executeSQL(query)
			.then(data => { return true; });
	}
	private createCategoriesTable(): Promise<boolean> {
		const query = 'CREATE TABLE IF NOT EXISTS categories ("name" VARCHAR(32), "version" FLOAT, "qtt" INTEGER)';
		return this.sqlService.executeSQL(query)
			.then(data => { return true; });
	}
	private createSetupTable(): Promise<boolean> {
		const query = 'CREATE TABLE IF NOT EXISTS setup ("key" VARCHAR(32), "value" VARCHAR(32))';
		return this.sqlService.executeSQL(query)
			.then(data => { return true; });
	}

	public async reset(): Promise<boolean> {
		try {
			const dropBreakers = 'DROP TABLE breakers';
			await this.sqlService.executeSQL(dropBreakers);
			const dropSetup = 'DROP TABLE setup';
			await this.sqlService.executeSQL(dropSetup);
			await this.createTables();
		} catch(err) {
			console.error("error on reseting ", err);
			if(err.code == 5) await this.createTables();
			return false;
		}
	}

	public async checkVersion(): Promise<any> {
		const dataVersion = environment.data_version;
		const savedVersion = await this.getDataVersion();
		return savedVersion >= dataVersion;
	}
	public async getDataVersion(): Promise<number> {
		const query = "SELECT value FROM setup WHERE key = 'version'";
		const v = await this.sqlService.selectSQL(query);
		console.info("version: ", v[0].value);
		return v[0].value;
	}

	public async setDataVersion(): Promise<boolean> {
		try {
			const version = environment.data_version;
			const query = `INSERT INTO setup (key, value) VALUES ('version', ${version})`;
			this.sqlService.executeSQL(query);
			return true;
		} catch(err) {
			console.error("error creating tables ", err);
			return false;
		}
	}

	public getInsertQuery(): string {
		return "INSERT INTO breakers (hash, content, category, favorite) VALUES ";
	}
	public async InsertBasicData(): Promise<any> {
		const basics = this.Loader.getBasics();
		console.info("basics: ", basics);
		const basicInsert = basics.data
			.map(b => {
				return `("${b.id}", "${b.content}", "basic", 0)`;
			});
		let query = this.getInsertQuery() + basicInsert.join(',');
		await this.sqlService.executeSQL(query)
		query = `INSERT INTO categories (name, version, qtt)
			VALUES
			("${basics.name}", ${basics.version}, ${basics.data.length})`;
		await this.sqlService.executeSQL(query)
		return true;
	}	
	public async InsertData(): Promise<any> {
		await this.InsertBasicData();
		await this.setDataVersion();
		return true;
	}


	public GetRandomBreaker(): Promise<any> {
		const random = Math.random();
		// const query = `SELECT * FROM breakers 
		// 	LIMIT 1 
		// 	OFFSET ABS(${random}) % MAX((SELECT COUNT(*) FROM breakers), 1)`;
		const query = "SELECT * FROM breakers";
		return this.sqlService.selectSQL(query)
			.then(data => {
				return data[Math.floor(Math.random() * data.length)];
			});
	}

}
