import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-depositos',
  templateUrl: './depositos.component.html',
  styleUrls: ['./depositos.component.sass']
})
export class DepositosComponent implements OnInit {

  constructor(private userService: UserService) { }
  conteudo:any;

  async ngOnInit() {
    await this.userService.obterDepositos().then(
      (data: any) => {
        this.conteudo = data;
      },
      (err) => {

      }
    );
  }
}
