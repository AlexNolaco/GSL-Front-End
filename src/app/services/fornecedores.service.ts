import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FornecedoresService {
  private aws = 'https://fjeofy31k8.execute-api.us-east-2.amazonaws.com/prod';

  constructor(private router: Router, private http: HttpClient) {}

  public async obterFornecedores() {
    return await this.http.get(this.aws + '/fornecedores').toPromise();
  }

  public async deletarFornecedores() {
    return await this.http.delete(this.aws + '/fornecedores').toPromise();
  }

  public async incluirFornecedores(obj: any) {
    return await this.http.post(this.aws + '/fornecedores', obj).toPromise();
  }

  public async alterarFornecedores(obj: any) {
    return await this.http.put(this.aws + '/fornecedores', obj).toPromise();
  }
}
