import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    public authService: AuthService,
  ) {}

  async loginWithGoogle() {
    await this.authService.loginGoogle();
  }
}
