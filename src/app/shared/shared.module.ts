import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// bootstrap
import { CollapseModule } from 'ngx-bootstrap/collapse';

// components
import { MenuSuperiorComponent } from "./components/menu-superior/menu-superior.component";
import { FooterComponent } from "./components/footer/footer.component";
import { MenuLoginComponent } from "./components/menu-login/menu-login.component";
import { AcessoNegadoComponent } from "./components/acesso-negado/acesso-negado.component";
import { NaoEncontradoComponent } from "./components/nao-encontrado/nao-encontrado.component";

//Services
import { UsuarioAcessoService } from "./services/usuario-acesso.service";

@NgModule({
    imports: [
        CommonModule, 
        RouterModule,
        CollapseModule 
    ],
    providers: [
        UsuarioAcessoService
    ],
    declarations: [
        MenuSuperiorComponent,
        FooterComponent,
        MenuLoginComponent,
        AcessoNegadoComponent,
        NaoEncontradoComponent
    ],
    exports: [
        MenuSuperiorComponent,
        FooterComponent,
        MenuLoginComponent,
        AcessoNegadoComponent,
        NaoEncontradoComponent
    ]
})
export class SharedModule { }