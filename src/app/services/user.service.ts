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
    private api = "http://api-gsl.com.br";
    private aws = "https://fjeofy31k8.execute-api.us-east-2.amazonaws.com/prod";

    public login(login: any, senha: any) {
      const body = {
        login,
        senha
      }
      return this.http.post(this.api + "/Login", body).toPromise();
    }

    public permissoes() {
      return this.http.get(this.api + "/Permissoes?idPerfil="+ localStorage.getItem('user.perfil')).toPromise();
    }
    public permissoesPorId(id: any) {
      return this.http.get(this.api + "/Permissoes?idPerfil="+ id).toPromise();
    }

    public async obterNomeTelaPorId(id: any) {
      return await this.http.get(this.api + "/telas?idTela="+ id, {responseType: 'text'}).toPromise();
    }

    public async alterarpermissao(item: any) {
      return await this.http.put(this.api + "/permissoes", item).toPromise();
    }

    public async obtemTodosOsUsuariosExcetoLogado(item: any) {
      return await this.http.get(this.api + "/usuarios?idUsuarioLogado="+ item).toPromise();
    }

    public async cadastrarUsuario(obj: any) {
      return this.http.post(this.api + "/usuarios", obj).toPromise();
    }

    public async log(msg: string) {
      const id = localStorage.getItem("user.identificador") || '';
      const perfil = localStorage.getItem("user.perfil") || '';
      const payload = {
        ID_USUARIO: parseInt(id),
        ID_PERFIL: parseInt(perfil),
        ACAO: msg
      }
      return this.http.post(this.api + "/logs", payload).toPromise();
    }

    public async removerUsuario(obj: any) {
      return await this.http.delete(this.api + "/usuarios?identificador=" + obj).toPromise();
    }
    public async editarUsuario(obj: any) {
      return await this.http.put(this.api + "/usuarios", obj).toPromise();
    }
     public async obterClientes() {
      return await this.http.get(this.aws + "/clientes").toPromise();
    }
    public async obterDepositos() {
      return await this.http.get(this.aws + "/depositos").toPromise();
    }
    public async obterFornecedores() {
      return await this.http.get(this.aws + "/fornecedores").toPromise();
    }
    public async obterMercadorias() {
      return await this.http.get(this.aws + "/mercadorias").toPromise();
    }

    public async deletarClientes() {
      return await this.http.delete(this.aws + "/clientes").toPromise();
    }
    public async deletarDepositos() {
      return await this.http.delete(this.aws + "/depositos").toPromise();
    }
    public async deletarFornecedores() {
      return await this.http.delete(this.aws + "/fornecedores").toPromise();
    }
    public async deletarMercadorias() {
      return await this.http.delete(this.aws + "/fornecedores").toPromise();
    }

    public async incluirClientes(obj: any) {
      return await this.http.post(this.aws + "/clientes", obj).toPromise();
    }
    public async incluirDepositos(obj: any) {
      return await this.http.post(this.aws + "/depositos", obj).toPromise();
    }
    public async incluirFornecedores(obj: any) {
      return await this.http.post(this.aws + "/fornecedores", obj).toPromise();
    }
    public async incluirMercadorias(obj: any) {
      return await this.http.post(this.aws + "/fornecedores", obj).toPromise();
    }

    public async alterarClientes(obj: any) {
      return await this.http.put(this.aws + "/clientes", obj).toPromise();
    }
    public async alterarDepositos(obj: any) {
      return await this.http.put(this.aws + "/depositos", obj).toPromise();
    }
    public async alterarFornecedores(obj: any) {
      return await this.http.put(this.aws + "/fornecedores", obj).toPromise();
    }
    public async alterarMercadorias(obj: any) {
      return await this.http.put(this.aws + "/fornecedores", obj).toPromise();
    }

    public async iniciar() {
      await this.http.get(this.api + "/ping", {responseType: 'text'}).toPromise();
    }
}
