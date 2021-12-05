import { UserService } from './../../services/user.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-depositos',
  templateUrl: './depositos.component.html',
  styleUrls: ['./depositos.component.sass']
})
export class DepositosComponent implements OnInit {

  constructor(private userService: UserService) { }
  conteudo:any;
  construct = false;
  @Input() permissao:any;
  mostrarAlerta() {
    this.construct = true;
    setTimeout(() => {this.construct = false}, 5000);
  }
  async ngOnInit() {
    this.userService.log("Acesso à tela: " + this.permissao.tela);
    await this.userService.obterDepositos().then(
      (data: any) => {
        this.conteudo = data;
        this.userService.log("Obter todos os depósitos.");
      },
      (err) => {
        this.userService.log("Erro ao obter todos os depósitos.");
      }
    );
  }
}
