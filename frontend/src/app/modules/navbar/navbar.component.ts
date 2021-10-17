import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  userLogged = this.authService.getLoggedUser();

  constructor(
    public authService: AuthService,
  ) {}

  logout() {
    this.authService.logout();
  }
}
