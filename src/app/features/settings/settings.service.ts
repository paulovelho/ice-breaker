import { Injectable } from '@angular/core';

import { DataLayerService } from '@app/services/data-layer.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

	constructor(
		private Service: DataLayerService,
	) { }

	public reset(): Promise<boolean> {
		return this.Service.reset();
	}

}
