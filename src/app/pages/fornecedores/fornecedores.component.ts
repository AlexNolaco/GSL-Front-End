import { Component, Input, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { FornecedoresService } from 'src/app/services/fornecedores.service';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.sass'],
})
export class FornecedoresComponent implements OnInit {
  conteudo: any;
  construct = false;
  @Input() permissao: any;

  constructor(
    private usuariosService: UsuariosService,
    private fornecedoresService: FornecedoresService
  ) {}

  async ngOnInit() {
    this.usuariosService.rastrear('Acesso à tela: ' + this.permissao.tela);
    await this.obterFornecedores();
  }

  async obterFornecedores() {
    await this.fornecedoresService.obterFornecedores().then(
      (data: any) => {
        this.conteudo = data;
        this.usuariosService.rastrear('Obter todos os fornecedores.');
      },
      (err) => {
        this.usuariosService.rastrear('Erro ao obter todos os fornecedores.');
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
