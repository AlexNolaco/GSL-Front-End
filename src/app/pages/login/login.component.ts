import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login = '';
  senha = '';
  erro = false;
  errorMessage = '';

  constructor(private loginService: LoginService) {}

  async ngOnInit() {
    await this.loginService.iniciar();
  }

  async rastrear() {
    this.loginService.login(this.login, this.senha).then(
      (data: any) => {
        localStorage.setItem('accessToken', data.token);
        localStorage.setItem('user.identificador', data.user.identificador);
        localStorage.setItem('user.nome', data.user.nome);
        localStorage.setItem('user.login', data.user.login);
        localStorage.setItem('user.perfil', data.user.perfil);
        this.loginService.rastrear('Login no sistema');
      },
      (err: any) => {
        this.erro = true;
        this.errorMessage = err.error.message;
        setTimeout(() => {
          this.erro = false;
        }, 5000);
        this.loginService.rastrear('Erro no login do sistema');
      }
    );
  }
}
