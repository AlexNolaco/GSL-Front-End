import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.sass']
})
export class ClientesComponent implements OnInit {

  constructor(private userService: UserService) { }
  conteudo:any;

  async ngOnInit() {
    await this.userService.obterClientes().then(
      (data: any) => {
        this.conteudo = data;
      },
      (err) => {

      }
    );
  }

}
