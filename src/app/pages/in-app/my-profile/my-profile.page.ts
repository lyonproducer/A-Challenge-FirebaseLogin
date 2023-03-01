import { Component, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
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
    private localstorage: LocalstorageService
  ) { }

  ngOnInit() {
    this.localstorage.get('userLogged')?.then(
      (res: UserLogged) => {
        console.log('res ', res);
        this.user = res.user;
        this.fullName = this.user.fullName;
        this.date = this.user.birthday;
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
      this.authService.updateUserData(this.user).then(
        res=> {
          console.log('this.user', res);
        }
      )
    }
  }
}
