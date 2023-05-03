import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DepositosService {
  private aws = 'https://fjeofy31k8.execute-api.us-east-2.amazonaws.com/prod';

  constructor(private router: Router, private http: HttpClient) {}

  public async obterDepositos() {
    return await this.http.get(this.aws + '/depositos').toPromise();
  }

  public async deletarDepositos() {
    return await this.http.delete(this.aws + '/depositos').toPromise();
  }

  public async incluirDepositos(obj: any) {
    return await this.http.post(this.aws + '/depositos', obj).toPromise();
  }

  public async alterarDepositos(obj: any) {
    return await this.http.put(this.aws + '/depositos', obj).toPromise();
  }
}
