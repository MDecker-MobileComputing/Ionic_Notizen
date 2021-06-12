import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnmeldenPage } from './anmelden.page';

const routes: Routes = [
  {
    path: '',
    component: AnmeldenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnmeldenPageRoutingModule {}
