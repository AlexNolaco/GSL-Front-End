import { JsonpClientBackend } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-perfis',
  templateUrl: './perfis.component.html',
  styleUrls: ['./perfis.component.css']
})
export class PerfisComponent implements OnInit {

  tabela: any;
  salvoSucesso = false;
  salvando = false;
  constructor(private loginService: LoginService) { }

  @Input() permissao: any;
  ngOnInit(): void {
    this.loginService.rastrear("Acesso à tela: " + this.permissao.tela);
    this.loginService.obterPermissoesPorId(2).then(
      (data: any) => {
        this.tabela = data;
        this.loginService.rastrear("Obter permissão por idPerfil: " + localStorage.getItem("user.perfil"));
      }, (err: any) => {
        this.loginService.rastrear("Erro ao obter permissão por idPerfil: " + localStorage.getItem("user.perfil"));
      }
    );
  }

  salvar() {
    this.salvando = true;
    this.tabela.forEach((element: any) => {
      this.loginService.alterarpermissao(element).then(
        (data: any) => {
          this.salvando = false;
          this.salvoSucesso = true;
          this.loginService.rastrear("Alterada permissão da tela:" + element.nometela + " perfil: " + element.iD_PERFIL);
          setTimeout(() => { this.salvoSucesso = false }, 5000);
        }, (err: any) => {
          this.loginService.rastrear("Erro ao alterar permissão da tela:" + element.nometela + " perfil: " + element.iD_PERFIL);
          this.salvando = false;
          this.salvoSucesso = false;
        }
      );
    });
  }

  onChange(evt: any) {
    this.loginService.obterPermissoesPorId(evt.target.value).then(
      (data: any) => {
        this.loginService.rastrear("Obter permissões por id: " + evt.target.value);
        this.tabela = data;
      }, (err: any) => {
        this.loginService.rastrear("Erro ao obter permissões por id: " + evt.target.value);
      }
    );
  }
}
