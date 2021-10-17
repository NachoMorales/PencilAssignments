import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasComponent } from './modules/canvas/canvas.component';
import { LoginComponent } from './modules/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'canvas/:id', component: CanvasComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
