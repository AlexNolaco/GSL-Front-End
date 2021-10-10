import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})

export class UserService {
    private isLogged = false;
    constructor(private router: Router) {
    }

    public IsUserLogged() {
        return this.isLogged;
    }
}
