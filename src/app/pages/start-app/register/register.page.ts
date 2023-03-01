import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
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
    private toastService: ToastService,
    private loadingService: LoadingService
  ) { 
    this.formRegister = this.fb.group({
      email: [null, [Validators.required, Validators.email, Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    }, { validators: this.checkPasswords });
  }

  ngOnInit() { }

  register(){
    this.loadingService.presentLoading('Cargando...');
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
          completedProfile:false
        } 
      }
      this.localStorage.set("user",userLogged.user);
      this.localStorage.set("userLogged",userLogged)!.then(()=>{
        this.authService.registerSetUserData(userLogged);
        this.authService.userBehavior.next(userLogged.user);
        this.router.navigateByUrl("/in-app");
        this.toastService.presentToast("Su cuenta ha sido registrada con éxito", 'success');
        this.formRegister.reset();
        this.loadingService.stopLoading();
      });

    }).catch((error) => {
      console.log("error", error);
      if(error.code === 400){
        this.toastService.presentToast('El correo ya fue utilizado en otra cuenta.', 'danger');
      }else{
        this.toastService.presentToast(error.message, 'danger');
      }
    });
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  };

}
