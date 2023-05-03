import { Component } from '@angular/core';
import { AfterViewInit, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'GSL';
  public isAdministratorMode = false;
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    //this.userService.configureAuth();
  }

  getLogged(): boolean {
    return this.userService.IsUserLogged();
  }
}