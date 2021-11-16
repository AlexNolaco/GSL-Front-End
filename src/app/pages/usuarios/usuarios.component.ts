import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.sass']
})
export class UsuariosComponent implements OnInit {

  constructor(private userService: UserService) { }
  usuariosLista:any;
  telaIncluir = false;
  ngOnInit(): void {
    this.userService.obtemTodosOsUsuariosExcetoLogado(localStorage.getItem('user.identificador')).then(
      (data: any) => {
        console.log(data);
        this.usuariosLista = data;

      }
    );
  }
vai(a: any) {
console.log(a);
}
  incluir(bool: any) {
    this.telaIncluir = bool;
  }
}
