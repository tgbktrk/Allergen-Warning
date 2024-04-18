import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllergensPageRoutingModule } from './allergens-routing.module';

import { AllergensPage } from './allergens.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllergensPageRoutingModule
  ],
  declarations: [AllergensPage]
})
export class AllergensPageModule {}
