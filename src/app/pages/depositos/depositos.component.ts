import { UserService } from './../../services/user.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-depositos',
  templateUrl: './depositos.component.html',
  styleUrls: ['./depositos.component.css']
})
export class DepositosComponent implements OnInit {

  constructor(private userService: UserService) { }
  conteudo: any;
  emConstrucao = false;
  @Input() permissao:any;

  async ngOnInit() {
    this.userService.log("Acesso à tela: " + this.permissao.tela);
    await this.obterDepositos();
  }

  async obterDepositos() {
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

  mostrarAlerta() {
    this.emConstrucao = true;
    setTimeout(() => {this.emConstrucao = false}, 5000);
  }
}
