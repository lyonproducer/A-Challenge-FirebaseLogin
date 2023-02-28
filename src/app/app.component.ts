import { Component } from '@angular/core';
import { LocalstorageService } from './services/localstorage.service';
import { TruckService } from './services/truck.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private localStorage: LocalstorageService,
    private truckService: TruckService
  ) {
    this.localStorage.init();
  }
}
