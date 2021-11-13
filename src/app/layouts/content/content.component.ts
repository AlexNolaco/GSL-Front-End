import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor() { }
  aberto = false;
  ngOnInit(): void {
  }
  remove() {
    localStorage.clear();
  }
  mostraMenu() {
    var a = document.getElementById("sidebarMenu");


    if (a  ) {
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
