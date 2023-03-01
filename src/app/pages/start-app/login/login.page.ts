import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserLogged } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials : any = {
    email: '', 
    password: ''
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private localstorage: LocalstorageService,
    private router: Router,
    public toastService: ToastService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
  }

  login(){
    this.loadingService.presentLoading(('Cargando...'));
    this.authService.signIn(this.credentials.email, this.credentials.password)      
    .then((res:any) => {
      console.log("response login ", res);
      let subscription = this.authService.getUserData(res.user.uid).subscribe(
        async (resUser:any)=>{
          const userLogged: UserLogged = {
            token: res.user.Aa,
            refreshToken: res.user.refreshToken,
            user: resUser
          }

          console.log("user res ", userLogged);
          this.authService.userLogged = userLogged;
          this.localstorage.set("user",userLogged.user);
          this.localstorage.set("userLogged",userLogged)!.then(()=>{
            subscription.unsubscribe();
            this.router.navigateByUrl("/in-app");
            this.authService.userBehavior.next(userLogged.user);
            this.loadingService.stopLoading();
            this.credentials = {
              email: '', 
              password: ''
            };
          });
        }
      );
    }).catch((error) => {
      console.log("error", error);
      if(error.code == 'auth/user-not-found'){
        this.toastService.presentToast('Usuario no existente.', 'error');
      }else{
        this.toastService.presentToast(error.message, 'error');
      }
      this.loadingService.stopLoading();
    });
  }
}
