import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationMapPageRoutingModule } from './location-map-routing.module';

import { LocationMapPage } from './location-map.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationMapPageRoutingModule,
    ComponentsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCSdlQdcfxYqkH_aSBWdky5UKybQo62tMk'
    })
  ],
  declarations: [LocationMapPage]
})
export class LocationMapPageModule {}
