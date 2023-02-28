import { Component, OnInit } from '@angular/core';
import { TruckService } from 'src/app/services/truck.service';

@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.page.html',
  styleUrls: ['./location-map.page.scss'],
})
export class LocationMapPage implements OnInit {

  trucks: any[] = [];

  truckToFollow: any;
  isFollowing = false;

  title = 'My first AGM project';
  lat = 8.296185;
  lng = -62.734596;

  zoom = 11;

  constructor(
    private truckService: TruckService
  ) { }

  ngOnInit() {
    this.getTrucks();
  }

  getTrucks() { 
    this.truckService.getTrucks().subscribe(
      res=> {
        console.log(res);
        this.trucks = res;
        if(this.isFollowing) {
          this.trucks.forEach(truck => {
            if(this.truckToFollow = truck) {
              this.lat = truck.latitude;
              this.lng = truck.longitude;
            }
          });
        }
      }
    )
  }

  goTo(truck: any) {
    if(truck === this.truckToFollow) {
      this.isFollowing = false;
      this.truckToFollow = null;
    } else {
      this.truckToFollow = truck;
      this.isFollowing = true;
      this.lat = truck.latitude;
      this.lng = truck.longitude;
    }
  }

}
