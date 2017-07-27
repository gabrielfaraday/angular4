import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { StringUtils } from "../../../utils/data-types-utils/string-utils";

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html',
  styleUrls: ['./menu-login.component.css']
})
export class MenuLoginComponent implements OnInit {
  public token;
  public user;
  public nome: string = "";

  constructor(private router: Router) { }
  
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('dnce.user'));

    if(this.user)
        this.nome = this.user.nome;
  }

  usuarioLogado(): boolean {
    this.token = localStorage.getItem('dnce.token');
    return !StringUtils.isNullOrEmpty(this.token);
  }

  logout() {
    localStorage.removeItem('dnce.token');
    localStorage.removeItem('dnce.user');
    this.router.navigateByUrl('/');
  }
}

