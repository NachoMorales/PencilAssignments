import { AfterViewInit, Component } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { fabric } from 'fabric';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  color = '#000000';
  canvas!: fabric.Canvas;
  savedCanvas!: string;
  dbCanvasRef!: AngularFireObject<any>;
  dbCanvas!: any;
  user!: firebase.default.User | null;

  constructor(
    public authService: AuthService,
    public db: AngularFireDatabase
  ) {
    this.authService.getLoggedUser().subscribe(res => {
      
      this.user = res;

      this.dbCanvasRef = this.db.object(this.user?.uid || 'default');
      this.dbCanvas = this.dbCanvasRef.valueChanges();
      this.restoreCanvas();
    }); // To do: unsubscribe
  }

  ngAfterViewInit() {
    this.loadCanvas();
  }
  
  loadCanvas() {
    this.canvas = new fabric.Canvas('canvas', { isDrawingMode: true, width: 10000, height: 1000 });
    this.canvas.setDimensions({ width: '100vw', height: '100vh' }, { cssOnly: true });
    this.loadEvents();
    this.handleColor();
  }

  loadEvents() {
    this.canvas.on('mouse:up', e => this.saveCanvas());
  }

  clearCanvas() {
    this.canvas.clear();
  }

  handleColor() {
    this.canvas.freeDrawingBrush.color = this.color;
  }

  saveCanvas() {
    this.dbCanvasRef.set(JSON.stringify(this.canvas.toJSON()));
  }

  restoreCanvas() {
    this.dbCanvas.subscribe((res: any) => {
      this.canvas.loadFromJSON(JSON.parse(res), this.canvas.renderAll.bind(this.canvas));
      // this.canvas.loadFromJSON(res, (objects: fabric.Object[]) => {
      //   if (objects) this.canvas.add(...objects);
      // });
    });
  }

  handleImage(e: any) {

    if (e.target.files && e.target.files[0]) {
      const file: File = e.target.files[0];
      const reader = new FileReader();

      reader.onload = ev => {        
        
        if (typeof reader.result !== 'string') return;

        fabric.Image.fromURL(reader.result, img => {
          this.canvas.add(img);
          this.canvas.centerObject(img);
        });
      }

      reader.readAsDataURL(file);
    }
  }

}
