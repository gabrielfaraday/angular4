import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { MyDatePickerModule } from 'mydatepicker';

// components
import { ContatosComponent } from "./contatos.component";
import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';
import { AdicionarEventoComponent } from "./adicionar-evento/adicionar-evento.component";
import { EditarEventoComponent } from './editar-evento/editar-evento.component';
import { MeusEventosComponent } from './meus-eventos/meus-eventos.component';
import { DetalhesEventoComponent } from './detalhes-evento/detalhes-evento.component';
import { ExcluirEventoComponent } from './excluir-evento/excluir-evento.component';

// services
import { SeoService } from '../services/seo.service';
import { EventoService } from "./services/evento.service";
import { OrganizadorService } from "../services/organizador.service";
import { AuthService } from "./services/auth.service";

// config
import { eventosRouterConfig } from "./evento.routes";

// modules
import { SharedModule } from "../shared/shared.module";
import { AdicionarContatoComponent } from './adicionar-contato/adicionar-contato.component';
import { DetalhesContatoComponent } from './detalhes-contato/detalhes-contato.component';
import { AlterarContatoComponent } from './alterar-contato/alterar-contato.component';
import { RemoverContatoComponent } from './remover-contato/remover-contato.component';
import { ListaContatosComponent } from './lista-contatos/lista-contatos.component';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild(eventosRouterConfig),
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        MyDatePickerModule,
    ],
    declarations: [
        ContatosComponent,
        ListaEventosComponent,
        AdicionarEventoComponent,
        EditarEventoComponent,
        MeusEventosComponent,
        DetalhesEventoComponent,
        ExcluirEventoComponent,
        AdicionarContatoComponent,
        DetalhesContatoComponent,
        AlterarContatoComponent,
        RemoverContatoComponent,
        ListaContatosComponent
    ],
    providers: [
        Title,
        SeoService,
        EventoService,
        OrganizadorService,
        AuthService
    ],
    exports: [RouterModule]
})

export class ContatosModule { }