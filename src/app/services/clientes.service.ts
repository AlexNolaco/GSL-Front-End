import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private api = 'http://api-gsl.com.br';
  private aws = 'https://fjeofy31k8.execute-api.us-east-2.amazonaws.com/prod';

  constructor(private router: Router, private http: HttpClient) {}

  public async incluirClientes(obj: any) {
    return await this.http.post(this.aws + '/clientes', obj).toPromise();
  }

  public async deletarClientes() {
    return await this.http.delete(this.aws + '/clientes').toPromise();
  }

  public async obterClientes() {
    return await this.http.get(this.aws + '/clientes').toPromise();
  }

  public async alterarClientes(obj: any) {
    return await this.http.put(this.aws + '/clientes', obj).toPromise();
  }
}
