import { Component } from '@angular/core';
import { PageService } from './core/page.service';
import { Location } from '@angular/common';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user!: firebase.default.User | null;
  loading = true;

  constructor(
    public pageService: PageService,
    public authService: AuthService,
    public location: Location,
  ) {

    authService.getLoggedUser().subscribe(res => {
      
      const unauthorizedUserPaths = [ '/login' ];
      
      this.user = res;

      this.loading = false;

      if (!this.user) pageService.navigateRoute('login');
      else if (unauthorizedUserPaths.includes(location.path())) pageService.navigateRoute('canvas/' + this.user.uid);
      else pageService.navigateRoute(location.path());
    });

  }
}
