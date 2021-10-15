import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Settings } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  public settings = Settings;

  constructor(
    private router: Router,
    private toastr: ToastrService,
  ) {
  }

  navigateRoute(route: string, params = {}) {
    this.router.navigate([route], params);
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }

  showError(message: string) {
    this.toastr.error(message);
  }

}
