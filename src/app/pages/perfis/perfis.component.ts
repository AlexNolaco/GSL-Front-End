import { Component, OnInit } from '@angular/core';
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
  ngOnInit(): void {
    this.userService.permissoesPorId(2).then(
      (data: any) => {
        this.tabela = data;

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
          setTimeout(() => {this.salvoSucesso= false}, 5000);
        },
        (err: any) => {
          this.salvando = false;
          this.salvoSucesso = false;
        }
      );
    });


    console.log(this.tabela );
  }

  onChange(evt: any) {

    this.userService.permissoesPorId(evt.target.value).then(
      (data: any) => {
        this.tabela = data;
        console.log(data);
      }
    );
  }
}

