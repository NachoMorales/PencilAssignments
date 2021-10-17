import { AfterViewInit, Component } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { ActivatedRoute, Params } from '@angular/router';
import { fabric } from 'fabric';
import { AuthService } from '../../core/auth.service';
import { PageService } from '../../core/page.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {

  color = '#000000';
  canvas!: fabric.Canvas;
  savedCanvas!: string;
  dbCanvasRef!: AngularFireObject<any>;
  dbCanvas!: any;
  user!: firebase.default.User | null;
  shareEmail!: string | null;
  subscriptions: any[] = [];
  sharedCanvas: string[] = [];
  canvasId!: string;
  shareEmailError!: string | null;

  constructor(
    public authService: AuthService,
    public db: AngularFireDatabase,
    public pageService: PageService,
    public activatedRoute: ActivatedRoute,
  ) {
    const subscription = this.authService.getLoggedUser().subscribe(res => this.user = res);
    this.subscriptions.push(subscription);

    const routeSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      this.canvasId = params.id;
      this.dbCanvasRef = this.db.object(this.canvasId);
      this.dbCanvas = this.dbCanvasRef.valueChanges();

      this.restoreCanvas();
    });

    this.subscriptions.push(routeSubscription);
  }

  ngAfterViewInit() {
    this.loadCanvas();
  }
  
  loadCanvas() {
    this.canvas = new fabric.Canvas('canvas', { isDrawingMode: true, width: document.documentElement.clientWidth, height: document.documentElement.clientHeight });
    this.loadEvents();
  }

  loadEvents() {
    this.canvas.on('mouse:up', e => this.saveCanvas());
    this.canvas.on('mouse:down:before', e => this.canvas.isDrawingMode = (e.target?.type !== 'image'));
  }

  clearCanvas() {
    this.canvas.clear();
  }

  handleColor() {
    this.canvas.freeDrawingBrush.color = this.color;
  }

  saveCanvas() {
    this.dbCanvasRef.update({ canvas: JSON.stringify(this.canvas.toJSON()), color: this.color, email: this.user?.email, shared: this.sharedCanvas });
  }

  restoreCanvas() {
    const subscription = this.dbCanvas.subscribe((res: any) => {
      if (!res) return;
      if (this.canvasId === this.user?.uid) this.sharedCanvas = res.shared || [];
      this.color = res.color;
      this.canvas.loadFromJSON(JSON.parse(res.canvas), this.canvas.renderAll.bind(this.canvas));
      this.handleColor();
    });

    this.subscriptions.push(subscription);
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
          this.saveCanvas();
        });
      }

      reader.readAsDataURL(file);
    }
  }

  share() {
    this.db.database.ref().orderByChild('email').equalTo(this.shareEmail).get()
    .then(res => {
      const users = res.val();

      if (!users) {
        this.shareEmailError = 'User not found.';
        return;
      }

      const userId = Object.keys(users)[0];

      this.db.object(userId).update({ shared: [...(users[userId].shared || []), { uid: this.user?.uid, email: this.user?.email }] });

      this.shareEmail = null;
      this.shareEmailError = null;
    });
  }

  selectCanvas(id: string) {
    this.pageService.navigateRoute('canvas/' + id);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
