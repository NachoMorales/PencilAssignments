import { Component } from '@angular/core';
import { BaseComponent } from '../core/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {

  async loginWithGoogle() {
    await this.authService.loginGoogle();
  }
}
