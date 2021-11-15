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
  ngOnInit(): void {
    this.userService.permissoesPorId(2).then(
      (data: any) => {
        this.tabela = data;

      }
    );
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
