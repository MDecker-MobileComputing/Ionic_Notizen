import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NeuenotizPageRoutingModule } from './neuenotiz-routing.module';

import { NeuenotizPage } from './neuenotiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NeuenotizPageRoutingModule
  ],
  declarations: [NeuenotizPage]
})
export class NeuenotizPageModule {}
