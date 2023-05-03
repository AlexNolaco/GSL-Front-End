import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ElementRef, } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.sass']
})
export class UsuariosComponent implements OnInit {

  constructor(private userService: UserService) { }
  @Input() permissao: any;
  selectOptions = [
    { valor: "Administrador" },
    { valor: "Fornecedor" },
    { valor: "Cliente" },
    { valor: "Colaborador" }
  ];

  @ViewChild('someVar') selectPerfil: ElementRef | undefined;
  usuariosLista: any;
  telaIncluir = false;
  telaDeletar = false;
  aguarde = false;
  modoEdicao = false;
  telaPrincipal = true;
  sucesso: any = null;
  identificador: any;
  erro: any;
  pesquisa: any;
  cloned: any;
  obj = {
    nome: '',
    login: '',
    senha: '',
    perfil: ''
  }

  async ngOnInit() {
    this.userService.log("Acesso à tela: " + this.permissao.tela);
    await this.buscaTudo();
  }

  async buscaTudo() {
    await this.userService.obtemTodosOsUsuariosExcetoLogado(localStorage.getItem('user.identificador')).then(
      (data: any) => {
        console.log(data);
        this.usuariosLista = data;
        this.userService.log("Obter todos os usuarios exceto logado.");
      }, (err: any) => {
        this.userService.log("Erro ao obter todos os usuarios exceto logado.");
      }
    );
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

  abrirTelaDeletar(bool: any) {
    this.telaDeletar = bool;
    this.telaPrincipal = !bool;
  }

  salvaIdentificador(al: any) {
    this.identificador = al;
  }

  async removerUsuario() {
    this.aguarde = true;
    this.abrirTelaDeletar(false);
    await this.userService.removerUsuario(this.identificador);
    this.userService.log("Removido usuario com identificador" + this.identificador);
    await this.buscaTudo();
    this.aguarde = false;
  }

  editar(a: any) {
    this.incluir(true, true)
    this.obj = a;
    let el = document.querySelector('.form-select');
  }

  async alterar() {
    await this.userService.editarUsuario(this.obj).then(
      (data: any) => {
        this.userService.log("Editado usuario" + this.obj.login);
        this.sucesso = true;
        this.buscaTudo();
        setTimeout(() => {
          this.sucesso = null;
          this.incluir(false)
          this.limpaform();
        }, 2000);
      }, (err: any) => {
        this.userService.log("Erro ao editar usuario" + this.obj.login);
        this.sucesso = false;
        this.erro = err.error;
        setTimeout(() => { this.sucesso = null }, 5000);
      }
    );
  }
  async salvar() {
    await this.userService.cadastrarUsuario(this.obj).then(
      (data: any) => {
        this.userService.log("Cadastrado usuario" + this.obj.login);
        this.sucesso = true;
        this.buscaTudo();
        setTimeout(() => {
          this.sucesso = null;
          this.incluir(false)
          this.limpaform();
        }, 2000);
      }, (err) => {
        this.userService.log("Erro ao cadastrar usuario" + this.obj.login);
        this.sucesso = false;
        this.erro = err.error;
        setTimeout(() => { this.sucesso = null }, 5000);
      }
    );
  }
}