import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotizenlistePageRoutingModule } from './notizenliste-routing.module';

import { NotizenlistePage } from './notizenliste.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotizenlistePageRoutingModule
  ],
  declarations: [NotizenlistePage]
})
export class NotizenlistePageModule {}
