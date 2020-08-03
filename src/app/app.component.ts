import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';
import { Role } from './_models/role';

import { NbSidebarService } from '@nebular/theme';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    :host nb-layout-header button:last-child {
      margin-left: auto;
    }
    `],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'laurea-app';
  currentUser: User;

  constructor(
    private sidebarService: NbSidebarService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  toggle() {
    this.sidebarService.toggle(false, 'left');
  }

  toggleCompact() {
    this.sidebarService.toggle(true, 'right');
  }

  items: NbMenuItem[] = [
    {
      title: 'Home',
      icon: 'person-outline',
      link: '/home'
    },
  ];

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
