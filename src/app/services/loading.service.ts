import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading: any;
  constructor(
    private loadingcontroller: LoadingController
  ) { }

  async presentLoading(message?: string) {
    this.loading = await this.loadingcontroller.create({
      mode: 'ios',
      message:  message || ''
    });
    await this.loading.present();
  }

  stopLoading() {
    this.loadingcontroller.dismiss();
  }
}
