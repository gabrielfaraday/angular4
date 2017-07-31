import { Injectable } from '@angular/core';
import { StringUtils } from "../../utils/data-types-utils/string-utils";

@Injectable()
export class UsuarioAcessoService {
    public token: string;
    public user;

    public obterUsuario() {
        return JSON.parse(localStorage.getItem('dnce.user'));
    }

    public usuarioLogado(): boolean {
        this.token = localStorage.getItem('dnce.token');
        return !StringUtils.isNullOrEmpty(this.token);
    }

    public validarClaim(claim: any) : boolean {
        if (!this.usuarioLogado())
            return false;

        if (claim !== undefined && claim !== null) {
            this.user = this.obterUsuario();
            
            if (!this.user.claims)
                return false;
            
            let userClaims = this.user.claims.some(x => x.type === claim.nome && x.value === claim.valor);
            if (!userClaims)
                return false;
        }

        return true;
    }
}