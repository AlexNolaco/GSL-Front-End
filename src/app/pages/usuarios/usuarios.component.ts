import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private loginService: LoginService) { }
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
    this.loginService.rastrear("Acesso à tela: " + this.permissao.tela);
    await this.buscaTudo();
  }

  async buscaTudo() {
    await this.loginService.obtemTodosOsUsuariosExcetoLogado(localStorage.getItem('user.identificador')).then(
      (data: any) => {
        this.usuariosLista = data;
        this.loginService.rastrear("Obter todos os usuarios exceto logado.");
      }, (err: any) => {
        this.loginService.rastrear("Erro ao obter todos os usuarios exceto logado.");
      }
    );
  }

  onChange(evt: any) {
    this.obj.perfil = evt.target.value;
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
    await this.loginService.removerUsuario(this.identificador);
    this.loginService.rastrear("Removido usuario com identificador" + this.identificador);
    await this.buscaTudo();
    this.aguarde = false;
  }

  editar(param: any) {
    this.incluir(true, true)
    this.obj = param;
    let el = document.querySelector('.form-select');
  }

  async alterar() {
    await this.loginService.editarUsuario(this.obj).then(
      (data: any) => {
        this.loginService.rastrear("Editado usuario" + this.obj.login);
        this.sucesso = true;
        this.buscaTudo();
        setTimeout(() => {
          this.sucesso = null;
          this.incluir(false)
          this.limpaform();
        }, 2000);
      }, (err: any) => {
        this.loginService.rastrear("Erro ao editar usuario" + this.obj.login);
        this.sucesso = false;
        this.erro = err.error;
        setTimeout(() => { this.sucesso = null }, 5000);
      }
    );
  }
  async salvar() {
    await this.loginService.cadastrarUsuario(this.obj).then(
      (data: any) => {
        this.loginService.rastrear("Cadastrado usuario" + this.obj.login);
        this.sucesso = true;
        this.buscaTudo();
        setTimeout(() => {
          this.sucesso = null;
          this.incluir(false)
          this.limpaform();
        }, 2000);
      }, (err: any) => {
        this.loginService.rastrear("Erro ao cadastrar usuario" + this.obj.login);
        this.sucesso = false;
        this.erro = err.error;
        setTimeout(() => { this.sucesso = null }, 5000);
      }
    );
  }
}
