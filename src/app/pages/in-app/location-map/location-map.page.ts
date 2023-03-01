import { Component, OnDestroy, OnInit } from '@angular/core';
import { TruckService } from 'src/app/services/truck.service';
import { Truck } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.page.html',
  styleUrls: ['./location-map.page.scss'],
})
export class LocationMapPage implements OnInit, OnDestroy {

  trucks: Truck[] = [];

  truckToFollow: Truck | undefined;
  isFollowing = false;

  // dublin latitude & latitude by default
  lat: number = 53.346359;
  lng: number = -6.268535;

  latAux: number = 0;
  lngAux: number = 0;

  zoom = 11;

  constructor(
    private truckService: TruckService
  ) { }

  ngOnInit() {
    this.getTrucks();
    this.truckService.initTruck();
  }

  getTrucks() { 
    this.truckService.getTrucks().subscribe(
      (res: Truck[]) => {
        //console.log(res);
        this.trucks = res;
        if(this.isFollowing) {
          this.trucks.forEach(truck => {
            if(this.truckToFollow?.id === truck.id) {
              this.lat = truck.latitude;
              this.lng = truck.longitude;
            }
          });
        }
      }
    )
  }

  goTo(truck: any) {
    if(this.truckToFollow?.id === truck.id) {
      this.isFollowing = false;
      this.truckToFollow = undefined;
    } else {
      this.truckToFollow = undefined;
      this.truckToFollow = truck;
      this.isFollowing = true;
      this.lat = truck.latitude;
      this.lng = truck.longitude;
    }
  }

  async updateTruck(truck: Truck) {
    await this.truckService.updateTruckData({
      show: !truck.show
    }, truck.id);
  }

  centerChanged(event: any) {
    this.latAux = event.lat;
    this.lngAux = event.lng;
  }

  zoomChanged(event: any) {
    this.zoom = event;
    this.lat = this.latAux;
    this.lng = this.lngAux;
  }

  ngOnDestroy(): void {
    this.truckService.clearInterval();
  }

  getIconSize() {
    return this.zoom < 14 ? 32 : 64;
  }
}
