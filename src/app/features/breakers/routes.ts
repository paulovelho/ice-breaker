import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewComponent } from './components/view/view.component';

export const routes: Routes = [
	{ path: '', component: ViewComponent },
];
