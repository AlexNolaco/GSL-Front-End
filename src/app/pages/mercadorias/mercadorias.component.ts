import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mercadorias',
  templateUrl: './mercadorias.component.html',
  styleUrls: ['./mercadorias.component.sass']
})
export class MercadoriasComponent implements OnInit {

  constructor(private userService: UserService) { }
  conteudo:any;

  async ngOnInit() {
    await this.userService.obterMercadorias().then(
      (data: any) => {
        this.conteudo = data;
      },
      (err) => {

      }
    );
  }

}
