import { OnInit, Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit  {

  constructor(private userService: UserService) {

  }
  aberto = false;
  tabelaPermissoes: any = [];
  pagina = "Home";

  setPagina(pag: string){
    this.pagina = pag;
  }
  ngOnInit() {
    window.addEventListener('resize', function () {
      var largura = window.innerWidth;
      var a = document.getElementById("sidebarMenu");
      if (a) {
        if (largura > 750)
          a.style.marginTop = "0px";
        else
          a.style.marginTop = "-30px";
      }

    });
    this.userService.permissoes().then(
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
        localStorage.setItem("permissoes", JSON.stringify( this.tabelaPermissoes));
        const aa: any = localStorage.getItem("permissoes");
        this.userService.log("Obter permissões");
      }
    );
  }
  remove() {
    this.userService.log("Logoff no sistema");
    localStorage.clear();
  }

  selecionaPermissao() {
    const aa: any = localStorage.getItem("permissoes");
    const valor = JSON.parse(aa).find((x: any) => x.tela == this.pagina);
    return valor;
  }

  mostraMenu() {
    var a = document.getElementById("sidebarMenu");


    if (a) {
      if (!this.aberto) {
        a.style.display = "block";
        a.style.marginTop = "-30px";
        a.style.padding = "0px!important";

        this.aberto = true;
      }
      else {
        a.style.display = "none";
        a.style.marginTop = "0px";

        this.aberto = false;
      }
    }

  }
}
