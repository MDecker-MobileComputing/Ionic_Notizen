import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrierenPage } from './registrieren.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrierenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrierenPageRoutingModule {}
