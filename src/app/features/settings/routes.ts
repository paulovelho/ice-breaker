import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PreferencesComponent } from './components/preferences/preferences.component';

export const routes: Routes = [
	{ path: '', component: PreferencesComponent },
];
