import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.sass']
})
export class FornecedoresComponent implements OnInit {

  constructor(private userService: UserService) { }
  conteudo:any;
  @Input() permissao:any;
  async ngOnInit() {
    this.userService.log("Acesso à tela: " + this.permissao.tela);
    await this.userService.obterFornecedores().then(
      (data: any) => {
        this.conteudo = data;
        this.userService.log("Obter todos os fornecedores.");
      },
      (err) => {
        this.userService.log("Erro ao obter todos os fornecedores.");
      }
    );
  }
}
