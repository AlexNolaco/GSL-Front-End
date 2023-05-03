import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  conteudo: any;
  construct = false;
  @Input() permissao: any;

  constructor(
    private loginService: LoginService,
    private clientesService: ClientesService
  ) {}


  async ngOnInit(): Promise<void> {
    this.loginService.rastrear('Acesso à tela: ' + this.permissao.tela);
    await this.obterClientes();
  }

  async obterClientes() {
    await this.clientesService.obterClientes().then(
      (data: any) => {
        this.conteudo = data;
        this.loginService.rastrear('Obter todos os clientes.');
      },
      (err) => {
        this.loginService.rastrear('Erro ao obter todos os clientes.');
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
