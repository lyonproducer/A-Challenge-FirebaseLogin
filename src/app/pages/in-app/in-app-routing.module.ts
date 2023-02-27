import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InAppPage } from './in-app.page';

const routes: Routes = [
  {
    path: '',
    component: InAppPage,
    children: [
      {
        path: '',
        redirectTo: 'location-map',
        pathMatch: 'full'
      },
      {
        path: 'location-map',
        loadChildren: () => import('./location-map/location-map.module').then( m => m.LocationMapPageModule)
      },
      {
        path: 'my-profile',
        loadChildren: () => import('./my-profile/my-profile.module').then( m => m.MyProfilePageModule)
      },
      {
        path: 'about-us',
        loadChildren: () => import('./about-us/about-us.module').then( m => m.AboutUsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InAppPageRoutingModule {}
