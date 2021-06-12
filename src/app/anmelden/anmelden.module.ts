import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnmeldenPageRoutingModule } from './anmelden-routing.module';

import { AnmeldenPage } from './anmelden.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnmeldenPageRoutingModule
  ],
  declarations: [AnmeldenPage]
})
export class AnmeldenPageModule {}
