import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private api = 'http://api-gsl.com.br';

  constructor(private router: Router, private http: HttpClient) {}

  public login(login: any, senha: any) {
    const body = { login, senha };
    return this.http.post(this.api + '/Login', body).toPromise();
  }

  public obterPermissoes() {
    return this.http
      .get(
        this.api + '/Permissoes?idPerfil=' + localStorage.getItem('user.perfil')
      )
      .toPromise();
  }

  public async obterPermissoesPorId(id: any) {
    return await this.http
      .get(this.api + '/Permissoes?idPerfil=' + id)
      .toPromise();
  }

  public async obterNomeTelaPorId(id: any) {
    return await this.http
      .get(this.api + '/telas?idTela=' + id, { responseType: 'text' })
      .toPromise();
  }

  public async alterarPermissao(item: any) {
    return await this.http.put(this.api + '/permissoes', item).toPromise();
  }

  public async rastrear(msg: string) {
    const id = localStorage.getItem('user.identificador') || '';
    const perfil = localStorage.getItem('user.perfil') || '';
    const payload = {
      ID_USUARIO: parseInt(id),
      ID_PERFIL: parseInt(perfil),
      ACAO: msg,
    };
    return await this.http.post(this.api + '/logs', payload).toPromise();
  }

  public async iniciar() {
    await this.http
      .get(this.api + '/ping', { responseType: 'text' })
      .toPromise();
  }

  public verificarUsuarioLogado() {
    let token = localStorage.getItem('accessToken');
    return token != null;
  }
}
