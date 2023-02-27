import { Injectable } from '@angular/core';
//import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {}

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);\
    //await this.storage.defineDriver(CordovaSQLiteDriver);
    const storage = await this.storage.create();
    this._storage = storage;
    console.log(this._storage);
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    return this._storage?.set(key, value);
  }

  public get(key: string) {
    return this._storage?.get(key);
  }

  public remove(key: string) {
    this._storage?.remove(key);
  }

  public clear(){
    this._storage?.clear();
  }
}
