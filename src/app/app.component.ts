import { LoginService } from 'src/app/services/login.service';
import { Component } from '@angular/core';
import { AfterViewInit, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';


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
    private loginService: LoginService
  ) { }

  ngOnInit(): void {

  }

  getLogged(): boolean {
    return this.loginService.verificarUsuarioLogado();
  }
}
