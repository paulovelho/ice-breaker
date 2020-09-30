import { Injectable } from '@angular/core';

import { Md5 } from 'ts-md5/dist/md5';

import { basics } from '@app/data/basics';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  getBasics(): any {
  	const category = basics.name;
  	const list = basics.data.map(b => {
			return {
				id: Md5.hashStr(b),
				category: category,
				content: b,
			};
  	});
  	return {
  		version: basics.version,
  		name: category,
  		data: list,
  	}
  }
}
