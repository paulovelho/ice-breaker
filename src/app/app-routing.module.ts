import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./features/breakers/breakers.module').then(m => m.BreakersModule)
  },
  {
    path: 'preferences',
    loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule)
  },
  {
  	path: 'about',
  	loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
