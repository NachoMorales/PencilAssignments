import { Component } from '@angular/core';
import { AngularFireObject } from '@angular/fire/compat/database';
import { fabric } from 'fabric';
import { Observable } from 'rxjs';
import { BaseComponent } from '../core/base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent {

  color = '#43FA32';
  canvas!: fabric.Canvas;
  savedCanvas!: string;
  dbCanvasRef!: AngularFireObject<any>;
  dbCanvas!: any;

  ngAfterViewInit() {
    this.dbCanvasRef = this.db.object('canvas');
    // this.dbCanvasRef = this.db.object(this.user.uid); To do: usar el uid del usuario
    this.dbCanvas = this.dbCanvasRef.valueChanges();
    this.loadCanvas();
  }
  
  loadCanvas() {
    this.canvas = new fabric.Canvas('canvas', { isDrawingMode: true, width: 10000, height: 1000 });
    this.canvas.setDimensions({ width: '100vw', height: '100vh' }, { cssOnly: true });
    this.loadEvents();
    this.handleColor();
    this.restoreCanvas();
  }

  loadEvents() {
    // To Do: agregar evento on mouse up o alguno de esos que ejecute saveCanvas()
  }

  clearCanvas() {
    this.canvas.clear();
  }

  handleColor() {
    this.canvas.freeDrawingBrush.color = this.color;
  }

  saveCanvas() {
    this.dbCanvasRef.set(this.canvas.toObject());
  }

  restoreCanvas() {
    this.dbCanvas.subscribe((res: any) => {
      console.log(res);
      this.canvas.loadFromJSON(res, (objects: fabric.Object[]) => {
        if (objects) this.canvas.add(...objects);
      });
    });
  }
}
