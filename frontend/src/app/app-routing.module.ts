import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { Settings } from './app.settings';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

Settings.routes.home.component = HomeComponent;
Settings.routes.login.component = LoginComponent;

let routes: Routes = [];

for (let routeKey in Settings.routes) {
  let route: Route = Settings.routes[routeKey];
  // let r: Route = {};

  // if (route.path || route.path == '') r.path = route.path;
  // if (route.redirectTo) r.redirectTo = route.redirectTo;
  // if (route.pathMatch) r.pathMatch = route.pathMatch;
  // if (route.component) r.component = route.component;
  // if (route.data) {
  //   r.data = route.data;
  //   r.canActivate = [HttpGuard];
  // }

  routes.push(route);
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
