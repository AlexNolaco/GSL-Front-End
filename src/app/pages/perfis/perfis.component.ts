import { JsonpClientBackend } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-perfis',
  templateUrl: './perfis.component.html',
  styleUrls: ['./perfis.component.sass']
})
export class PerfisComponent implements OnInit {

  constructor(private userService: UserService) { }
  tabela: any;
  salvoSucesso = false;
  salvando = false;
  @Input() permissao:any;
  ngOnInit(): void {
    this.userService.log("Acesso à tela: " + this.permissao.tela);
    this.userService.permissoesPorId(2).then(
      (data: any) => {
        this.tabela = data;
        this.userService.log("Obter permissão por idPerfil: " + localStorage.getItem("user.perfil") );
      },
      (err: any) => {
        this.userService.log("Erro ao obter permissão por idPerfil: " + localStorage.getItem("user.perfil"));
      }
    );
  }

  salvar() {
    this.salvando = true;
    this.tabela.forEach((element: any) => {
      this.userService.alterarpermissao(element).then(
        (data: any) => {
          this.salvando = false;
          this.salvoSucesso = true;
          this.userService.log("Alterada permissão da tela:" + element.nometela + " perfil: " + element.iD_PERFIL);
          setTimeout(() => {this.salvoSucesso= false}, 5000);
        },
        (err: any) => {
          this.userService.log("Erro ao alterar permissão da tela:" + element.nometela + " perfil: " + element.iD_PERFIL);
          this.salvando = false;
          this.salvoSucesso = false;
        }
      );
    });



  }

  onChange(evt: any) {

    this.userService.permissoesPorId(evt.target.value).then(
      (data: any) => {
        this.userService.log("Obter permissões por id: " + evt.target.value);
        this.tabela = data;
        console.log(data);
      },
      (err: any) => {
        this.userService.log("Erro ao obter permissões por id: " + evt.target.value);
      }
    );
  }
}

