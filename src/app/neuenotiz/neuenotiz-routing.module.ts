import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NeuenotizPage } from './neuenotiz.page';

const routes: Routes = [
  {
    path: '',
    component: NeuenotizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NeuenotizPageRoutingModule {}
