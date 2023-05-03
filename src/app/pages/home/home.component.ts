import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor() { }
  nomeUser: any;
  perfil: any;
  data: any;

  ngOnInit(): void {
    this.nomeUser = localStorage.getItem('user.nome');
    const expr = localStorage.getItem('user.perfil');
    switch (expr) {
      case "1":
        this.perfil = "Administrador";
        break;
      case "4":
        this.perfil = "Colaborador";
        break;
      case "2":
        this.perfil = "Fornecedor";
        break;
      case "3":
        this.perfil = "Cliente";
        break;
      default:
        this.perfil = "Desconhecido";
    }

    this.data = new Date().toLocaleString();
  }
}
