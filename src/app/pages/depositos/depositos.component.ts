import { DepositosService } from 'src/app/services/depositos.service';
import { LoginService } from '../../services/login.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-depositos',
  templateUrl: './depositos.component.html',
  styleUrls: ['./depositos.component.css'],
})
export class DepositosComponent implements OnInit {
  conteudo: any;
  emConstrucao = false;
  @Input() permissao: any;

  constructor(
    private loginService: LoginService,
    private depositosService: DepositosService
  ) {}


  async ngOnInit() {
    this.loginService.rastrear('Acesso à tela: ' + this.permissao.tela);
    await this.obterDepositos();
  }

  async obterDepositos() {
    await this.depositosService.obterDepositos().then(
      (data: any) => {
        this.conteudo = data;
        this.loginService.rastrear('Obter todos os depósitos.');
      },
      (err) => {
        this.loginService.rastrear('Erro ao obter todos os depósitos.');
      }
    );
  }

  mostrarAlerta() {
    this.emConstrucao = true;
    setTimeout(() => {
      this.emConstrucao = false;
    }, 5000);
  }
}
