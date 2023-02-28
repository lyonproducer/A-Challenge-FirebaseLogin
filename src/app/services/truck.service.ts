import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TruckService {

  constructor(
    public afStore: AngularFirestore,
  ) { }

  // trucks endpoints 
  getTrucks() {
    return this.afStore.collection('trucks').valueChanges();
  }

  getTruckById(id: string) {
    return this.afStore.collection('trucks', ref=> ref.where("id", "==", id)).valueChanges();
  }

  // addHistory(data: any) {
  //   return this.afStore.collection('history').add(Object.assign({}, data));
  // }

  // updateHistoryData(data: any, id: string) {
  //   const dataRef: AngularFirestoreDocument<any> = this.afStore.doc(`history/${id}`);
  //   return dataRef.set(data, {
  //     merge: true
  //   });
  // }
}
