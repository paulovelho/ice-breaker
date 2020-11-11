import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreditsComponent } from './components/credits/credits.component';

export const routes: Routes = [
	{ path: '', component: CreditsComponent },
];
