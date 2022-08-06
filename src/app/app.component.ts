import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentUser;
  constructor(
    private permissionsService: NgxPermissionsService,
    private router: Router
  ) {
  }

  ngOnInit() {
    // this.currentUser = localStorage.getItem('Token');
    // if (!this.currentUser) {
    //    return this.router.navigate(['/auth/login']);
    // }
    // this.authService.currentPermissions.subscribe(x => {
    //   this.permissionsService.addPermission(x, (permissionName, permissionsObject) => {
    //     return !!permissionsObject[permissionName];
    //   });
    // });
   }
}
