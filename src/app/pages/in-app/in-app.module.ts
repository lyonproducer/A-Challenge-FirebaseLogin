import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InAppPageRoutingModule } from './in-app-routing.module';

import { InAppPage } from './in-app.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InAppPageRoutingModule
  ],
  declarations: [InAppPage]
})
export class InAppPageModule {}
