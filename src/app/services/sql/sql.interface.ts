import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

export interface ISQL {

	Initialize(): Promise<boolean>;
	getDb(): Promise<any>;
	executeSQL(query: string): Promise<any>;
	selectSQL(query: string): Promise<any>;

}
