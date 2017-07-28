import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';

// bootstrap
import { AlertModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';

// components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegistrarUsuarioComponent } from './usuarios/components/registrar-usuario/registrar-usuario.component';
import { LoginComponent } from "./usuarios/components/login/login.component";
import { AcessoNegadoComponent } from "./shared/components/acesso-negado/acesso-negado.component";

// services
import { SeoService } from "./shared/services/seo.service";
import { UsuarioService } from "./usuarios/services/usuario.service";

// modules
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrarUsuarioComponent,
    LoginComponent,
    AcessoNegadoComponent,
    RegistrarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    SharedModule,
    ReactiveFormsModule,
    ToastModule.forRoot(),
    AlertModule.forRoot(),
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    RouterModule.forRoot(rootRouterConfig, { useHash: false })
  ],
  providers: [
    Title,
    SeoService,
    UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

