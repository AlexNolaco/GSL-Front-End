import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ContentComponent } from './layouts/content/content.component';
import { FormsModule } from '@angular/forms';
import { PerfisComponent } from './pages/perfis/perfis.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { DepositosComponent } from './pages/depositos/depositos.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { MercadoriasComponent } from './pages/mercadorias/mercadorias.component';
import { FornecedoresComponent } from './pages/fornecedores/fornecedores.component';
import { SearchPipePipe } from './pipes/search-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    ContentComponent,
      PerfisComponent,
      ClientesComponent,
      DepositosComponent,
      UsuariosComponent,
      MercadoriasComponent,
      FornecedoresComponent,
      SearchPipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
