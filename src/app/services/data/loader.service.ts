import { Injectable } from '@angular/core';

import { Md5 } from 'ts-md5/dist/md5';

import { data as basics } from '@app/data/basics';
import { data as cinema } from '@app/data/cinema';
import { data as paulovelho } from '@app/data/paulovelho';
import { data as sex } from '@app/data/sex';
import { data as openers } from '@app/data/openers';
import { data as travel } from '@app/data/travel';

@Injectable({
	providedIn: 'root'
})
export class LoaderService {

	constructor() { }

	private formatData(b: any, name: string) {
		return {
			id: Md5.hashStr(b),
			category: name,
			content: b,
		};
	}

	public returnData(data: any) {
		const category = data.name;
		const list = data.data.map((b) => {
			return this.formatData(b, category);
		});
		return {
			version: data.version,
			name: category,
			data: list,
		}
	}

	getBasics(): any {
		return this.returnData(basics);
	}
	getCinema(): any {
		return this.returnData(cinema);
	}
	getPaulovelho(): any {
		return this.returnData(paulovelho);
	}
	getSex(): any {
		return this.returnData(sex);
	}
	getOpeners(): any {
		return this.returnData(openers);
	}
	getTravel(): any {
		return this.returnData(travel);
	}



}
