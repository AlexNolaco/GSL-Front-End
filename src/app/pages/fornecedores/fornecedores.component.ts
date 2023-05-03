import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FornecedoresService } from 'src/app/services/fornecedores.service';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css'],
})
export class FornecedoresComponent implements OnInit {
  conteudo: any;
  construct = false;
  @Input() permissao: any;

  constructor(
    private loginService: LoginService,
    private fornecedoresService: FornecedoresService
  ) {}

  async ngOnInit() {
    this.loginService.rastrear('Acesso à tela: ' + this.permissao.tela);
    await this.obterFornecedores();
  }

  async obterFornecedores() {
    await this.fornecedoresService.obterFornecedores().then(
      (data: any) => {
        this.conteudo = data;
        this.loginService.rastrear('Obter todos os fornecedores.');
      },
      (err) => {
        this.loginService.rastrear('Erro ao obter todos os fornecedores.');
      }
    );
  }

  mostrarAlerta() {
    this.construct = true;
    setTimeout(() => {
      this.construct = false;
    }, 5000);
  }
}
