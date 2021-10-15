import { Component } from '@angular/core';
import { BaseComponent } from '../core/base.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent extends BaseComponent {

  userLogged = this.authService.getLoggedUser();

  logout() {
    this.authService.logout();
  }
}
