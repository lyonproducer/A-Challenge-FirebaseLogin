import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToastService } from 'src/app/services/toast.service';
import { User, UserRegisterDto } from 'src/app/shared/interfaces';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: UserRegisterDto = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  formRegister: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private localStorage: LocalstorageService,
    private toastService: ToastService
  ) { 
    this.formRegister = this.fb.group({
      email: [null, [Validators.required, Validators.email, Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  ngOnInit() { }

  register(){
    this.authService.registerUser(this.formRegister.value.email, this.formRegister.value.password)      
    .then((res:any) => {
      console.log("response register ", res);
      const userLogged = {
        token:res.user.Aa,
        refreshToken:res.user.refreshToken,
        user: {
          email: this.formRegister.value.email,
          fullName: '',
          uid: res.user.uid,
          completedProfile:false,
          verifiedProfile:false,
        } 
      }
      
      this.localStorage.set("user",userLogged)!.then(()=>{
        this.authService.registerSetUserData(userLogged);
        this.router.navigateByUrl("/in-app");
        this.toastService.presentToast("Su cuenta ha sido registrada con éxito", 'success');
      });

    }).catch((error) => {
      console.log("error", error);
      if(error.code == 'auth/email-already-in-use'){
        this.toastService.presentToast('El correo ya fue utilizado en otra cuenta.', 'error');
      }else{
        this.toastService.presentToast(error.message, 'error');
      }
    });
    
  }

}
