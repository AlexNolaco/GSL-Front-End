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
      console.log('verificando token')
      console.log(token!= null)
      return token != null;
    }

    public Login() {
      const api = "http://localhost:61374";
      return this.http.get(`${api}/Login`);
    }
}
