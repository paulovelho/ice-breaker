import { Component, OnInit } from '@angular/core';

import { environment } from '@app/../environments/environment';


@Component({
	selector: 'app-credits',
	templateUrl: './credits.component.html',
	styleUrls: ['./credits.component.scss'],
})
export class CreditsComponent implements OnInit {

	public version: string = "...";
	public db_version: string = "...";
	public last_update: string = "...";
	constructor() { }

	ngOnInit() {
		this.version = environment.version.toString();
		this.db_version = environment.data_version.toString();
		this.last_update = environment.last_update.toString();
	}

}
