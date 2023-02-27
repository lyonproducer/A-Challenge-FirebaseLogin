import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials : any = {
    email: '', 
    password: '', 
    token:'', 
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private localstorage: LocalstorageService,
    private router: Router,
    public toastController: ToastController
  ) { }

  ngOnInit() {
  }

  login(){
    //this.utilsService.presentLoading();
    this.authService.signIn(this.credentials.email, this.credentials.password)      
    .then((res:any) => {
      //console.log("response login ", res);
      let subscription = this.authService.getUserData(res.user.uid).subscribe(
        async (resUser:any)=>{
          const userLogged = {
            token:res.user.Aa,
            refreshToken:res.user.refreshToken,
            user: resUser
          }

          console.log("user", userLogged);
          this.authService.userLogged = userLogged;
          this.localstorage.set("user",userLogged)!.then(()=>{
            this.router.navigate(["/tabs"]);
            subscription.unsubscribe();
            // this.utilsService.closeLoading();
          });
          // this.formSingIn.reset();
        }
      );
    }).catch((error) => {
      console.log("error", error);
      if(error.code == 'auth/user-not-found'){
        // this.utilsService.closeLoading();
        this.presentErrorToast('Usuario no existente.');
      }else{
        // this.utilsService.closeLoading();
        this.presentErrorToast(error.message);
      }
    });
  }

  async presentErrorToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: "top",
      color: "danger",
      cssClass: "toast",
    });
    toast.present();
  }

}
