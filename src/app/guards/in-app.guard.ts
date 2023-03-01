import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LocalstorageService } from '../services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class InnAppGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    private localStorage: LocalstorageService,
    private navCtrl: NavController
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return new Promise(async (resolve) => {
      const hasPreviousSession = await this.localStorage.get('userLogged');
      console.log('hasPreviousSession ', hasPreviousSession);
      if (hasPreviousSession) {         
        resolve(true); 
      } else {
        this.navCtrl.navigateRoot(["/login"]); 
        resolve(false);
      }
    });
  }
}
