import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'anmelden',
    loadChildren: () => import('./anmelden/anmelden.module').then( m => m.AnmeldenPageModule)
  },
  {
    path: 'registrieren',
    loadChildren: () => import('./registrieren/registrieren.module').then( m => m.RegistrierenPageModule)
  },
  {
    path: 'notizenliste',
    loadChildren: () => import('./notizenliste/notizenliste.module').then( m => m.NotizenlistePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
