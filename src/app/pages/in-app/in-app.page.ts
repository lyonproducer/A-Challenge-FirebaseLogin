import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-in-app',
  templateUrl: './in-app.page.html',
  styleUrls: ['./in-app.page.scss'],
})
export class InAppPage implements OnInit {

  constructor(
    public menu: MenuController,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.router.navigateByUrl('/login');
  }
}
