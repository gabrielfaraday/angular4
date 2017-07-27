import { Routes } from '@angular/router';

import { ContatosComponent } from "./contatos.component";

import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';
import { AdicionarEventoComponent } from "./adicionar-evento/adicionar-evento.component";
import { EditarEventoComponent } from "./editar-evento/editar-evento.component";
import { MeusEventosComponent } from "./meus-eventos/meus-eventos.component";
import { DetalhesEventoComponent } from "./detalhes-evento/detalhes-evento.component";
import { ExcluirEventoComponent } from "./excluir-evento/excluir-evento.component";

import { AuthService } from "./services/auth.service";

export const eventosRouterConfig: Routes = [
    {
        path: '', component: ContatosComponent,
        children: [
            { path: '', component: ListaEventosComponent },
            { path: 'novo', canActivate: [AuthService], component: AdicionarEventoComponent, data: [{ claim: { nome: 'Eventos', valor: 'Gravar' } }] },
            { path: 'meus-eventos', canActivate: [AuthService], component: MeusEventosComponent },
            { path: 'editar/:id', canActivate: [AuthService], component: EditarEventoComponent, data: [{ claim: { nome: 'Eventos', valor: 'Gravar' } }] },
            { path: 'detalhes/:id', component: DetalhesEventoComponent },
            { path: 'excluir/:id', canActivate: [AuthService], component: ExcluirEventoComponent, data: [{ claim: { nome: 'Eventos', valor: 'Gravar' } }] }
        ]
    }
];