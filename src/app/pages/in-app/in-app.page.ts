import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-in-app',
  templateUrl: './in-app.page.html',
  styleUrls: ['./in-app.page.scss'],
})
export class InAppPage implements OnInit {

  constructor(
    public menu: MenuController,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() { }

  logout() {
    this.authService.signOut();
  }
}
