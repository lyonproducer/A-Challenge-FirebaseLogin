import { Component, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  @ViewChild('popoverDate', { static: false }) popoverDate: any;
  
  hInn: any;
  hOut: any;
  
  constructor() { }

  ngOnInit() {
  }

  confirm(datetime: any, popoverDate: any) {
    datetime.el.confirm();
    popoverDate.el.dismiss();
  }
  
  reset(datetime: any) {
    datetime.el.reset();
  }

  formatTime(value: string) {
    //console.log(format(parseISO(value), 'h:mm a'));
    console.log('format date moment ', moment(value, 'HH:mm').format('hh:mm A'));
    return moment(value, 'HH:mm').format('hh:mm A')
    //return format(parseISO(value), 'h:mm a');
  }

}
