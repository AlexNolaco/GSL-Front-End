import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MercadoriasService {
  private aws = 'https://fjeofy31k8.execute-api.us-east-2.amazonaws.com/prod';
  constructor(private router: Router, private http: HttpClient) {}

  public async obterMercadorias() {
    return await this.http.get(this.aws + '/mercadorias').toPromise();
  }

  public async deletarMercadorias() {
    return await this.http.delete(this.aws + '/mercadorias').toPromise();
  }

  public async incluirMercadorias(obj: any) {
    return await this.http.post(this.aws + '/mercadorias', obj).toPromise();
  }

  public async alterarMercadorias(obj: any) {
    return await this.http.put(this.aws + '/mercadorias', obj).toPromise();
  }
}
