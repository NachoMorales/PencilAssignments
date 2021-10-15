import { Component } from '@angular/core';
import { fabric } from 'fabric';
import { BaseComponent } from '../core/base.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent {

  canvas!: fabric.Canvas;

  ngAfterViewInit() {
    this.canvas = new fabric.Canvas('canvas');
    this.canvas.setDimensions({ width: '100%', height: '100vh' }, { cssOnly: true });
  }

}
