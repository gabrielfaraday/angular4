import { Routes } from '@angular/router';

import { ContatosComponent } from "./contatos.component";
import { ListaContatosComponent } from "./components/lista-contatos/lista-contatos.component";
import { AuthService } from "../shared/services/auth.service";
import { AdicionarContatoComponent } from "./components/adicionar-contato/adicionar-contato.component";
import { DetalhesContatoComponent } from "./components/detalhes-contato/detalhes-contato.component";
import { AlterarContatoComponent } from "./components/alterar-contato/alterar-contato.component";
import { RemoverContatoComponent } from "./components/remover-contato/remover-contato.component";


export const contatosRouterConfig: Routes = [
    {
        path: '', component: ContatosComponent,
        children: [
            { path: '', component: ListaContatosComponent },
            { path: 'novo', canActivate: [AuthService], component: AdicionarContatoComponent, data: [{ claim: { nome: 'Contatos', valor: 'Gerenciar' } }] },
            { path: 'alterar/:id', canActivate: [AuthService], component: AlterarContatoComponent, data: [{ claim: { nome: 'Contatos', valor: 'Gerenciar' } }] },
            { path: 'detalhes/:id', canActivate: [AuthService], component: DetalhesContatoComponent, data: [{ claim: { nome: 'Contatos', valor: 'Ver' } }] },
            { path: 'remover/:id', canActivate: [AuthService], component: RemoverContatoComponent, data: [{ claim: { nome: 'Contatos', valor: 'Gerenciar' } }] }
        ]
    }
];