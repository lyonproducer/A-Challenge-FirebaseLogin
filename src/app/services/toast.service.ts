import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast: ToastController) { }

  async presentToast(message: string, color: string) {
    const toast = await this.toast.create({
      color,
      message
    });
    await toast.present();
  }

}
