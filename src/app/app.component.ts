import { Component } from '@angular/core';
import { AfterViewInit, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { UsuariosService } from './services/usuarios.service';

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
    private usuariosService: UsuariosService
  ) { }

  ngOnInit(): void {

  }

  getLogged(): boolean {
    return this.usuariosService.verificarUsuarioLogado();
  }
}
