import { Injectable, Output, EventEmitter } from '@angular/core';

import { DataLayerService } from '@app/services/data-layer.service';
import { CategoriesService } from '@app/services/categories.service';


import { Breaker } from './model';

@Injectable({
	providedIn: 'root'
})
export class BreakersService {

	@Output() newBreaker = new EventEmitter<Breaker>();
	private loading: boolean = false;
	private initPromise: Promise<any> = null;

	constructor(
		private Service: DataLayerService,
    private Categories: CategoriesService,
	) { }

	public async LoadItAll(): Promise<any> {
		console.info('loading all');
		if(this.initPromise) return this.initPromise;
		this.initPromise = this.Service.InitializeDB();
		console.info('returning promise');
		return this.initPromise;
	}

	public LoadOne(): void {
		this.GetBreaker()
			.then((data: Breaker) => {
				this.newBreaker.emit(data);
			})
			.catch(err => {
				console.error(err);
			});
	}

	public LoadFavorite(): void {
		this.GetFavorite()
			.then((data: Breaker) => {
				this.newBreaker.emit(data);
			})
			.catch(err => {
				console.error(err);
			});
	}

	private BreakerFromData(data, fav: boolean = false): Breaker {
		if(!data) return null;
		return new Breaker().from({
			hash: data.hash,
			content: data.content,
			id: data.id,
			category: data.category,
			categoryName: data.categoryName,
			favorite: fav,
		});		
	}

	public async GetBreaker(): Promise<Breaker> {
		await this.LoadItAll();
		let data = await this.Service.GetRandomBreaker();
		if(data == null) return null;
		data.categoryName = await this.Categories.getCategoryName(data.category);
		return this.BreakerFromData(data);
	}

	public async GetFavorite(): Promise<Breaker> {
		await this.LoadItAll();
		return this.Service.GetFavoriteBreaker()
			.then(data => this.BreakerFromData(data, true));
	}

	public InsertFavorite(b: Breaker): Promise<any> {
		return this.Service.InsertFavorite(b);
	}
	public RemoveFavorite(b: Breaker): Promise<any> {
		return this.Service.RemoveFavorite(b.id);
	}

	public async GetAllCategories(): Promise<any> {
		await this.LoadItAll();
		return this.Service.GetCategories();
	}

}
