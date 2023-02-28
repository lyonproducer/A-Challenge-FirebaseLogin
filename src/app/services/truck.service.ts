import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import OneBus from '../../assets/jsons/OneBus.json';
import ManyBuses from '../../assets/jsons/ManyBuses.json';
import moment from 'moment';
import { Observable } from 'rxjs';
import { Truck, TruckJson } from '../shared/interfaces';
@Injectable({
  providedIn: 'root'
})
export class TruckService {

  intervalId: any;
  busData: TruckJson[]= [];
  busesData: TruckJson[]= [];

  constructor(
    public afStore: AngularFirestore,
  ) { 
    this.busData = OneBus;
    this.busesData = ManyBuses;
  }

  initTruck() {
    this.intervalId = setInterval(() => this.reviewData(),500);
  }

  clearInterval() {
    clearInterval(this.intervalId);
  }

  reviewData() {
    let timeFiltered = this.busesData.filter(
      data => {
        const now = moment().format("HH:mm:ss");
        return data.Time === now;
      }
    );
    console.log('Found times at json ', timeFiltered);
    if(timeFiltered.length > 0){
      timeFiltered.forEach(truck => {
        console.log("truck to update ", truck);
        this.setPosition(truck);
      });
    }
  }

  async setPosition(data:any) {
    await this.updateTruckData({
      longitude: data.Longitude, 
      latitude: data.Latitude
    }, data.VehicleID.toString());
  }

  // trucks endpoints 
  getTrucks() {
    return this.afStore.collection('trucks').valueChanges() as Observable<Truck[]>;
  }

  getTruckById(id: string) {
    return this.afStore.collection('trucks', ref=> ref.where("id", "==", id)).valueChanges();
  }

  updateTruckData(data: any, id: string) {
    const dataRef: AngularFirestoreDocument<any> = this.afStore.doc(`trucks/${id}`);
    return dataRef.set(data, {
      merge: true
    });
  }
}
