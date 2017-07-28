import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegistrarUsuarioComponent } from "./usuarios/components/registrar-usuario/registrar-usuario.component";
import { LoginComponent } from "./usuarios/components/login/login.component";
import { AcessoNegadoComponent } from "./shared/components/acesso-negado/acesso-negado.component";

export const rootRouterConfig: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'registrar', component: RegistrarUsuarioComponent },
    { path: 'login', component: LoginComponent },
    { path: 'acesso-negado', component: AcessoNegadoComponent },
    { path: 'contatos', loadChildren: 'app/contatos/contatos.module#ContatosModule' },
];