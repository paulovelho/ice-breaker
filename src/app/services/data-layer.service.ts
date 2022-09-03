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

	public dbLoaded: boolean = false;
	private retriesCategory: number = 0;

	constructor(
		private Http: HttpClient,
		private Loader: LoaderService,
    @Inject('SQLService') private sqlService: ISQL,
	) { }

	public async InitializeDB(): Promise<any> {
		if(this.dbLoaded) return true;
		await this.sqlService.Initialize();
		try {
			const isUpdated = await this.checkVersion();
			if(!isUpdated) {
				console.error("data not updated! reseting...");
				await this.reset();
				await this.InsertData();	
			} else {
				console.info("data is ok!");
				this.dbLoaded = true;
			}
		} catch (err) {
			console.error('error initializing db:', err);
			await this.reset();
			await this.InsertData();
			this.dbLoaded = true;
		}
		return true;
	}

	public async createTables(): Promise<boolean> {
		console.info('creating tables');
		try {
			await this.createBreakerTable();
			await this.createFavoritesTable();
			await this.createCategoriesTable();
			await this.createSetupTable();
			return true;
		} catch(err) {
			console.error("error creating tables ", err);
			return false;
		}
	}
	private createFavoritesTable(): Promise<boolean> {
		console.info('creating favorites table');
		const query = 'CREATE TABLE IF NOT EXISTS favorites ("id" INTEGER PRIMARY KEY AUTOINCREMENT, "hash" VARCHAR(32), "content" TEXT, "category" VARCHAR(32))';
		return this.sqlService.executeSQL(query)
			.then(data => { return true; });
	}
	private createBreakerTable(): Promise<boolean> {
		console.info('creating breakers table');
		const query = 'CREATE TABLE IF NOT EXISTS breakers ("id" INTEGER PRIMARY KEY AUTOINCREMENT, "hash" VARCHAR(32), "content" TEXT, "category" VARCHAR(32))';
		return this.sqlService.executeSQL(query)
			.then(data => { return true; });
	}
	private createCategoriesTable(): Promise<boolean> {
		console.info('creating categories table');
		const query = 'CREATE TABLE IF NOT EXISTS categories ("name" VARCHAR(32), "title" VARCHAR(100), "version" FLOAT, "qtt" INTEGER, active TINYINT(1))';
		return this.sqlService.executeSQL(query)
			.then(data => { return true; });
	}
	private createSetupTable(): Promise<boolean> {
		console.info('create setups table');
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
			const dropCategories = 'DROP TABLE categories';
			await this.sqlService.executeSQL(dropCategories);
			this.dbLoaded = false;
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
		console.info("data version: ", v[0].value);
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
		return "INSERT INTO breakers (hash, content, category) VALUES ";
	}
	public InsertFavorite(breaker: any): Promise<any> {
		const query = `INSERT INTO favorites (hash, content, category)
			VALUES
			("${breaker.hash}", "${breaker.content}", "${breaker.category}")`;
		return this.sqlService.executeSQL(query);
	}

	public InsertBasicData(): Promise<any> {
		return this.InsertDataForCategory("basics", this.Loader.getBasics());
	}
	public InsertCinemaData(): Promise<any> {
		return this.InsertDataForCategory("pop", this.Loader.getCinema());
	}
	public InsertPaulovelhoData(): Promise<any> {
		return this.InsertDataForCategory("paulovelho", this.Loader.getPaulovelho());
	}
	public InsertSexData(): Promise<any> {
		return this.InsertDataForCategory("sex", this.Loader.getSex(), false);
	}
	public InsertTravelData(): Promise<any> {
		return this.InsertDataForCategory("viagem", this.Loader.getTravel());
	}
	public InsertAuthorData(): Promise<any> {
		return this.InsertDataForCategory("authors", this.Loader.getAuthors(), false);
	}
	public InsertWouldYouData(): Promise<any> {
		return this.InsertDataForCategory("would-you", this.Loader.getWouldYou());
	}

	public InsertRotulosData(): Promise<any> {
		return this.InsertDataForCategory("rotulos", this.Loader.getRotulos(), true);
	}

	public async InsertDataForCategory(name: string, data: any, active: boolean = true): Promise<any> {
		console.info("inserting: ", name);
		const basicInsert = data.data
			.map(b => {
				return `("${b.id}", "${b.content}", "${name}")`;
			});
		let query = this.getInsertQuery() + basicInsert.join(',');
		await this.sqlService.executeSQL(query)
		query = `INSERT INTO categories (name, title, version, qtt, active)
			VALUES
			("${data.name}", "${data.title}", ${data.version}, ${basicInsert.length}, ${active})`;
		await this.sqlService.executeSQL(query)
		return true;
	}

	public async InsertData(): Promise<any> {
		return this.InsertRotulosData();
		await this.InsertBasicData();
		await this.InsertCinemaData();
		await this.InsertPaulovelhoData();
		await this.InsertSexData();
		await this.InsertTravelData();
		await this.setDataVersion();
		await this.InsertAuthorData();
		await this.InsertWouldYouData();
		return true;
	}

	public async GetValidCategories(): Promise<Array<string>> {
		const query = "SELECT name, title FROM categories WHERE active = 1";
		try {
			const data = await this.sqlService.selectSQL(query);
			let categories: Array<any> = Object.values(data);
			this.retriesCategory = 0;
			return categories.map(c => c["name"]);
		} catch(err) {
			console.error('get categories err:', err);
			if(err.code == 5) {
				await this.createTables();
				await this.InsertData();
				this.retriesCategory ++;
				if(this.retriesCategory > 3) return [];
				else return this.GetValidCategories();
			} else {
				return [];
			}
		}
	}

	public async GetRandomBreaker(): Promise<any> {
		// const query = `SELECT * FROM breakers 
		// 	LIMIT 1 
		// 	OFFSET ABS(${random}) % MAX((SELECT COUNT(*) FROM breakers), 1)`;
		const cats = await this.GetValidCategories();
		if(cats.length == 0) return null;
		const query = `SELECT * FROM breakers WHERE category IN ( "${cats.join('", "')}" )`;
		return this.sqlService.selectSQL(query)
			.then(data => {
				return data[Math.floor(Math.random() * data.length)];
			});
	}
	public GetFavoriteBreaker(): Promise<any> {
		const query = "SELECT * FROM favorites";
		return this.sqlService.selectSQL(query)
			.then(data => {
				console.info("getting one of ", data);
				return data[Math.floor(Math.random() * data.length)];
			});
	}

	public RemoveFavorite(id): Promise<any> {
		const query = "DELETE FROM favorites WHERE id = "+id;
		return this.sqlService.executeSQL(query);
	}

	public GetCategories(): Promise<any> {
		const query = "SELECT * FROM categories";
		return this.sqlService.selectSQL(query)
			.then(data => {
				return Object.values(data);
			});
	}

	public updateCategoryActive(name: string, active: boolean): Promise<any> {
		const query = `UPDATE categories SET active = ${active} WHERE name = "${name}"`;
		return this.sqlService.executeSQL(query);
	}

}
