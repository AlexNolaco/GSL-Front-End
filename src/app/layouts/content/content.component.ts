import { OnInit, Component } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(private loginService: LoginService) { }
  aberto = false;
  tabelaPermissoes: any = [];
  pagina = "Home";

  ngOnInit() {
    this.setEventListners();
    this.obterPermissoes();
  }

  obterPermissoes() {
    this.loginService.obterPermissoes().then(
      async (data: any) => {
        let filtrado = data.filter((x: any) => x.leitura == true);
        for (let index = 0; index < filtrado.length; ++index) {
          const objetoFinal = {
            tela: filtrado[index].nometela,
            gravacao: filtrado[index].gravacao,
            remocao: filtrado[index].remocao,
            edicao: filtrado[index].edicao,
          }
          this.tabelaPermissoes.push(objetoFinal);
        }
        localStorage.setItem("permissoes", JSON.stringify(this.tabelaPermissoes));
        this.loginService.rastrear("Obter permissões");
      }
    );
  }

  setEventListners() {
    window.addEventListener('resize', function () {
      var largura = window.innerWidth;
      var sideBar = document.getElementById("sidebarMenu");
      if (sideBar) {
        if (largura > 750)
          sideBar.style.marginTop = "0px";
        else
          sideBar.style.marginTop = "-30px";
      }
    });
  }

  setarPagina(pag: string) {
    this.pagina = pag;
  }

  logoff() {
    this.loginService.rastrear("Logoff no sistema");
    localStorage.clear();
  }

  selecionarPermissao() {
    const permissoes: any = localStorage.getItem("permissoes");
    const valor = JSON.parse(permissoes).find((x: any) => x.tela == this.pagina);
    return valor;
  }

  mostrarMenu() {
    var sideBar = document.getElementById("sidebarMenu");
    if (sideBar) {
      if (!this.aberto) {
        sideBar.style.display = "block";
        sideBar.style.padding = "0px!important";
        this.aberto = true;
      }
      else {
        sideBar.style.display = "none";
        this.aberto = false;
      }
    }
  }
}
