import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.sass']
})
export class FornecedoresComponent implements OnInit {

  constructor(private userService: UserService) { }
  conteudo:any;

  async ngOnInit() {
    await this.userService.obterFornecedores().then(
      (data: any) => {
        this.conteudo = data;
      },
      (err) => {

      }
    );
  }
}
