import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login="";
  senha="";
  erro= false;
  erroMessage = "";
  constructor(private userService: UserService) { }

  async logar(){
    this.userService.login(this.login, this.senha).then(
      (data: any) => {
        localStorage.setItem('accessToken', data.token);
        localStorage.setItem('user.identificador', data.user.identificador);
        localStorage.setItem('user.nome', data.user.nome);
        localStorage.setItem('user.login', data.user.login);
        localStorage.setItem('user.perfil', data.user.perfil);
      },
      (err: any) => {
        this.erro = true;
        console.log(err);
        this.erroMessage = err.error.message;
        setTimeout(() => {this.erro= false}, 5000);
      }
    );
  }

}
