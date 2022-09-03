import { Injectable } from '@angular/core';

import { Md5 } from 'ts-md5/dist/md5';

import { data as authors } from '@app/data/authors';
import { data as basics } from '@app/data/basics';
import { data as cinema } from '@app/data/cinema';
import { data as paulovelho } from '@app/data/paulovelho';
import { data as sex } from '@app/data/sex';
import { data as travel } from '@app/data/travel';
import { data as wouldyou } from '@app/data/would-you';

import { data as rotulos } from '@app/data/rotulos';
import { data as rotulosSN } from '@app/data/rotulos-sn';

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
			title: data.title,
			data: list,
		}
	}

	getAuthors(): any {
		return this.returnData(authors);
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
	getTravel(): any {
		return this.returnData(travel);
	}
	getWouldYou(): any {
		return this.returnData(wouldyou);
	}

	getRotulos(): any {
		return this.returnData(rotulos);
	}
	getRotulosSN(): any {
		return this.returnData(rotulosSN);
	}


}
