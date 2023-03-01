import { Component, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ToastService } from 'src/app/services/toast.service';
import { User, UserLogged } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  @ViewChild('popoverDate', { static: false }) popoverDate: any;
  
  user: User | undefined;

  fullName: string = '';
  date: any;
  
  constructor(
    private authService: AuthService,
    private localstorage: LocalstorageService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.localstorage.get('user')?.then(
      (res: User) => {
        console.log('res ', res);
        if(res){
          this.user = res;
          this.getUser(this.user);
        }
      }
    );
  }

  getUser(user: User) {
    this.authService.getUserData(user.uid).subscribe(
      (res: any) => {
        console.log('this.user', res);
        this.fullName = res.fullName;
        this.date = res.birthday;
        this.localstorage.remove("user");
        this.localstorage.set("user",res);
      }
    );
  }

  confirm(datetime: any, popoverDate: any) {
    datetime.el.confirm();
    popoverDate.el.dismiss();
  }
  
  reset(datetime: any, popoverDate: any) {
    datetime.el.reset();
    popoverDate.el.dismiss();
  }

  formatTime(value: any) {
    console.log('value ', value);
    return moment(value).format('DD-MM-YYYY')
  }

  save() {
    if(this.user) {
      this.user.birthday = this.date;
      this.user.fullName = this.fullName;
      this.user.completedProfile = true;
      console.log('this.user ', this.user);
      this.authService.updateUserData(this.user).then(
        res => {
          console.log('this.user', res);
          this.toastService.presentToast('Actualizado con éxito', 'success');
        }
      );
    }
  }
}
