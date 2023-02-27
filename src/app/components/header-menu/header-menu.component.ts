import { Component, Input, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {

  @Input() title: string = '';
  constructor(
    public menu: MenuController
  ) { }

  ngOnInit() {}

  openMenu() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
}
