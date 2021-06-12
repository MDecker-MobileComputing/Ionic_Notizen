import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotizenlistePage } from './notizenliste.page';

const routes: Routes = [
  {
    path: '',
    component: NotizenlistePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotizenlistePageRoutingModule {}
