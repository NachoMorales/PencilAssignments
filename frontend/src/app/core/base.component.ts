import { OnInit, Directive, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PageService } from './page.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Settings } from '../app.settings';
import { AuthService } from './auth.service';

@Directive({})
export class BaseComponent implements OnInit {

  user!: firebase.default.User | null;
  country: any;
  settings = Settings;
  global: any;
  
  constructor(
    public formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public modalService: NgbModal,
    public pageService: PageService,
    public authService: AuthService
  ) {
    this.settings = this.pageService.settings;
    this.authService.getLoggedUser().subscribe(res => this.user = res);
  }

  ngOnInit() {

  }

  openModal(content: ElementRef) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result;
  }

  closeModal() {
    this.modalService.dismissAll();
  }

}