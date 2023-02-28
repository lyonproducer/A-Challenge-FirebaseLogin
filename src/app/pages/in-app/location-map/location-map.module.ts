import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationMapPageRoutingModule } from './location-map-routing.module';

import { LocationMapPage } from './location-map.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationMapPageRoutingModule,
    ComponentsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApiKey
    })
  ],
  declarations: [LocationMapPage]
})
export class LocationMapPageModule {}
