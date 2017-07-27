import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AcessoNegadoComponent } from './shared/acesso-negado/acesso-negado.component';
import { InscricaoComponent } from "./usuario/inscricao/inscricao.component";
import { LoginComponent } from './usuario/login/login.component';

export const rootRouterConfig: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'inscricao', component: InscricaoComponent },
    { path: 'entrar', component: LoginComponent },
    { path: 'acesso-negado', component: AcessoNegadoComponent },
    { path: 'eventos', loadChildren: 'app/eventos/evento.module#EventosModule' },
];