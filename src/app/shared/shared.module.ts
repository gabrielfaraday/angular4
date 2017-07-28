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

@NgModule({
    imports: [
        CommonModule, 
        RouterModule,
        CollapseModule 
        ],
    declarations: [
        MenuSuperiorComponent,
        FooterComponent,
        MenuLoginComponent,
        AcessoNegadoComponent
        ],
    exports: [
        MenuSuperiorComponent,
        FooterComponent,
        MenuLoginComponent,
        AcessoNegadoComponent
        ]
})
export class SharedModule { }