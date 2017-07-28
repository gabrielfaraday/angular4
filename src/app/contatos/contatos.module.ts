import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { MyDatePickerModule } from 'mydatepicker';

// components
import { ContatosComponent } from "./contatos.component";
import { ListaContatosComponent } from "./components/lista-contatos/lista-contatos.component";
import { AdicionarContatoComponent } from "./components/adicionar-contato/adicionar-contato.component";
import { AlterarContatoComponent } from "./components/alterar-contato/alterar-contato.component";
import { DetalhesContatoComponent } from "./components/detalhes-contato/detalhes-contato.component";
import { RemoverContatoComponent } from "./components/remover-contato/remover-contato.component";

// services
//import { SeoService } from "../shared/services/seo.service";
import { ContatoService } from "./services/contatos.service";
import { AuthService } from "../shared/services/auth.service";

// config
import { contatosRouterConfig } from "./contatos.routes";

// modules
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild(contatosRouterConfig),
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        MyDatePickerModule,
    ],
    declarations: [
        ContatosComponent,
        AdicionarContatoComponent,
        DetalhesContatoComponent,
        AlterarContatoComponent,
        RemoverContatoComponent,
        ListaContatosComponent
    ],
    providers: [
        Title,
        //SeoService,
        ContatoService,
        AuthService
    ],
    exports: [RouterModule]
})

export class ContatosModule { }