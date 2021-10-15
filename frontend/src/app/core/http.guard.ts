// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
// import { GlobalService } from './global.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class HttpGuard implements CanActivate {

//   constructor(
//     private global: GlobalService
//   ) {
//     this.global.checkUser();
//   }

//   /**
//    * Can activate
//    */
//   canActivate(next: ActivatedRouteSnapshot): Promise<boolean> {
//     return new Promise(async (resolve) => {
//       const user = this.global.getUser();
//       resolve(user && next.data.roles.includes(user.role));
//     });
//   }
// }
