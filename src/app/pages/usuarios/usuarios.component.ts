import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.sass']
})
export class UsuariosComponent implements OnInit {

  constructor(private userService: UserService) { }
  usuariosLista: any;
  telaIncluir = false;
  telaDeletar = false;
  aguarde = false;
  modoEdicao = false;
  telaPrincipal = true;
  sucesso: any = null;
  identificador:any;
  erro:any;
  pesquisa:any;
  cloned:any;
  obj = {
    nome: '',
    login: '',
    senha: '',
    perfil: ''
  }
  async ngOnInit() {
    await this.buscaTudo();
  }
  async buscaTudo() {
    await this.userService.obtemTodosOsUsuariosExcetoLogado(localStorage.getItem('user.identificador')).then(
      (data: any) => {
        console.log(data);
        this.usuariosLista = data;
      }
    );
  }
  vai(a: any) {
    console.log(a);
  }

  onChange(evt: any) {
    this.obj.perfil = evt.target.value;
    console.log(evt.target.value)
  }
  verificarObrigatoriedade() {
    return this.obj.nome.trim() == "" ||
           this.obj.login.trim() == "" ||
           this.obj.senha.trim() == "" ||
           this.obj.perfil.trim() == "";
  }

  limpaform() {
    this.obj = {
      nome: '',
      login: '',
      senha: '',
      perfil: ''
    }
  }
  incluir(bool: any, edicao: boolean = false) {
    this.telaIncluir = bool;
    this.telaPrincipal = !bool;
    this.modoEdicao = edicao;
  }
  filtrar() {

  }

  abrirTelaDeletar(bool: any) {
    this.telaDeletar = bool;
    this.telaPrincipal = !bool;
  }
  salvaIdentificador(al: any) {
    this.identificador= al;
    console.log(al);
  }
  async removerUsuario() {
    this.aguarde = true;
    this.abrirTelaDeletar(false);
    await this.userService.removerUsuario(this.identificador);
    await this.buscaTudo();
    this.aguarde = false;
  }

  editar(a: any) {
    this.incluir(true, true)
    this.obj = a;

  }
  async alterar() {
    await this.userService.editarUsuario(this.obj).then(
      (data: any) => {
        this.sucesso = true;
        this.buscaTudo();
        setTimeout(() => {
          this.sucesso= null;
          this.incluir(false)
          this.limpaform();
        }, 2000);
      },
      (err: any) => {
        this.sucesso = false;
        this.erro = err.error;
        setTimeout(() => {this.sucesso= null}, 5000);
      }
    );



  }
  async salvar() {
    await this.userService.cadastrarUsuario(this.obj).then(
      (data: any) => {
        this.sucesso = true;
        this.buscaTudo();
        setTimeout(() => {
          this.sucesso= null;
          this.incluir(false)
          this.limpaform();
        }, 2000);
      },
      (err) => {
        this.sucesso = false;
        this.erro = err.error;
        setTimeout(() => {this.sucesso= null}, 5000);
      }
    );

  }
}
