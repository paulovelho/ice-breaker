import { Injectable, Inject } from '@angular/core';

import { DataLayerService } from './data-layer.service';

@Injectable({
	providedIn: 'root'
})
export class CategoriesService {

	private categories: any[] = [];

	constructor(
		private DataService: DataLayerService,
	) { }

	public async getCategoryName(categoryId): Promise<string> {
		if(!this.categories[categoryId]) {
			let categoriesRs = await this.DataService.GetCategories();
			categoriesRs.map(c => this.categories[c.name] = c.title);
		}
		return this.categories[categoryId];
	}

}
