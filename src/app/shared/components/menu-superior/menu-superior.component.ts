import { Component, OnInit } from '@angular/core';
import { StringUtils } from "../../../utils/data-types-utils/string-utils";

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html'
})
export class MenuSuperiorComponent {
  private token: string;
  constructor() { }
  
  public isCollapsed: boolean = true;

  usuarioLogado(): boolean {
    this.token = localStorage.getItem('dnce.token');
    return !StringUtils.isNullOrEmpty(this.token);
  }
}
