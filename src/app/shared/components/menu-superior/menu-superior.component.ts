import { Component, OnInit } from '@angular/core';
import { StringUtils } from "../../../utils/data-types-utils/string-utils";

import { UsuarioAcessoService } from "../../services/usuario-acesso.service";

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html'
})
export class MenuSuperiorComponent {
  private token: string;
  
  constructor(private usuarioAcessoService: UsuarioAcessoService) { }
  
  public isCollapsed: boolean = true;

  usuarioLogado(): boolean {
    this.token = localStorage.getItem('dnce.token');
    return !StringUtils.isNullOrEmpty(this.token);
  }

  validarClaim(claim: any) {
      return this.usuarioAcessoService.validarClaim(claim);
  }
}
