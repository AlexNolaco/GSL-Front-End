import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.sass']
})
export class ClientesComponent implements OnInit {

  constructor(private userService: UserService) { }
  conteudo:any;
  @Input() permissao:any;

  async ngOnInit(): Promise<void> {
    this.userService.log("Acesso à tela: " + this.permissao.tela);

    await this.userService.obterClientes().then(
      (data: any) => {
        this.conteudo = data;
        this.userService.log("Obter todos os clientes.");
      },
      (err) => {
        this.userService.log("Erro ao obter todos os clientes.");
      }
    );
  }

}
