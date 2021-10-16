import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageService } from './core/page.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user!: firebase.default.User | null;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(
    public pageService: PageService,
    public authService: AuthService,
    public routerModule: RouterModule,
    private breakpointObserver: BreakpointObserver,
    public location: Location,
  ) {

    // To Do: mover componentes a carpeta modules

    authService.getLoggedUser().subscribe(res => {
      
      const unauthorizedUserPaths = [ '/login' ];
      this.user = res;

      if (!this.user) pageService.navigateRoute('login');
      else if (unauthorizedUserPaths.includes(location.path())) pageService.navigateRoute('home');
      else pageService.navigateRoute(location.path());
    });

    // (-) User
  }
}
