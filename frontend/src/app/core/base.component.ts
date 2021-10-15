import { OnInit, Directive } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PageService } from './page.service';
import { Settings } from '../app.settings';
import { AuthService } from './auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Directive({})
export class BaseComponent implements OnInit {

  user!: firebase.default.User | null;
  country: any;
  settings = Settings;
  
  constructor(
    public formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public pageService: PageService,
    public authService: AuthService,
    public db: AngularFireDatabase
  ) {
    this.settings = this.pageService.settings;
    this.authService.getLoggedUser().subscribe(res => this.user = res); // To do: unsubscribe
  }

  ngOnInit() {

  }

}