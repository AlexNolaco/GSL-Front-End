import { Component, Input, OnInit } from '@angular/core';
import { MercadoriasService } from 'src/app/services/mercadorias.service';
import { LoginService } from './../../services/login.service';

@Component({
  selector: 'app-mercadorias',
  templateUrl: './mercadorias.component.html',
  styleUrls: ['./mercadorias.component.css'],
})
export class MercadoriasComponent implements OnInit {
  conteudo: any;
  @Input() permissao: any;
  construct = false;

  constructor(
    private loginService: LoginService,
    private mercadoriasService: MercadoriasService
  ) { }

  async ngOnInit() {
    this.loginService.rastrear('Acesso à tela: ' + this.permissao.tela);
    this.obterMercadorias();
  }

  async obterMercadorias() {
    await this.mercadoriasService.obterMercadorias().then(
      (data: any) => {
        this.conteudo = data;
        this.loginService.rastrear('Obter todas as mercadorias.');
      },
      (err) => {
        this.loginService.rastrear('Erro ao obter todas as mercadorias.');
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
