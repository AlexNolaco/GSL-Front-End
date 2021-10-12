import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
 
import { Router } from '@angular/router';
 
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [ './navbar.component.scss' ],
})
export class NavbarComponent implements OnInit {
 
   

    hidden = false;

   

    constructor(   private router: Router) {}

    ngOnInit() {
         
    }

    exibirMenu() {
    
    }

    logout() {
        this.router.navigate([ 'logout' ]);
    }

    toggleVisibility() {
       
    }
}
