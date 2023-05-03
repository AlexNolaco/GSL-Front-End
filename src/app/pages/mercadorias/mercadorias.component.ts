import { UserService } from './../../services/user.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mercadorias',
  templateUrl: './mercadorias.component.html',
  styleUrls: ['./mercadorias.component.sass']
})
export class MercadoriasComponent implements OnInit {

  constructor(private userService: UserService) { }
  conteudo: any;
  @Input() permissao: any;
  construct = false;
  mostrarAlerta() {
    this.construct = true;
    setTimeout(() => { this.construct = false }, 5000);
  }

  async ngOnInit() {
    this.userService.log("Acesso à tela: " + this.permissao.tela);
    await this.userService.obterMercadorias().then(
      (data: any) => {
        this.conteudo = data;
        this.userService.log("Obter todas as mercadorias.");
      }, (err) => {
        this.userService.log("Erro ao obter todas as mercadorias.");
      }
    );
  }
}