import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})

export class UserService {
    private isLogged = false;
    constructor(private router: Router, private http: HttpClient) {
    }
    public IsUserLogged () {
      let token = localStorage.getItem('accessToken');


      return token != null;
    }

    public login(login: any, senha: any) {
      const body = {
        login,
        senha
      }
      const api = "http://localhost:61374";
      return this.http.post(api + "/Login", body).toPromise();
    }
    public permissoes() {
      const api = "http://localhost:61374";
      return this.http.get(api + "/Permissoes?idPerfil="+ localStorage.getItem('user.perfil')).toPromise();
    }
    public permissoesPorId(id: any) {
      const api = "http://localhost:61374";
      return this.http.get(api + "/Permissoes?idPerfil="+ id).toPromise();
    }

    public async obterNomeTelaPorId(id: any) {
      const api = "http://localhost:61374";
      return await this.http.get(api + "/telas?idTela="+ id, {responseType: 'text'}).toPromise();
    }

    public async alterarpermissao(item: any) {
      const api = "http://localhost:61374";
      return await this.http.put(api + "/permissoes", item).toPromise();
    }


}
