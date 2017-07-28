import { Component, OnInit } from '@angular/core';

import { Contato } from "../../models/contato";
import { SeoService } from "../../../shared/services/seo.service";
import { ContatoService } from "../../services/contatos.service";
import { SeoModel } from "../../../shared/models/seo-model";

@Component({
  selector: 'app-lista-contatos',
  templateUrl: './lista-contatos.component.html',
  styleUrls: ['./lista-contatos.component.css']
})
export class ListaContatosComponent implements OnInit {
  public contatos: Contato[];
  errorMessage: string;

  constructor(seoService: SeoService,
     public service: ContatoService) {
       
      let seoModel: SeoModel = <SeoModel>{
        title: 'Contatos',
        description: 'Lista dos contatos',
        robots: 'Index, Follow',
        keywords: 'contatos,agenda'
      };

      seoService.setSeoData(seoModel);    
  }

  ngOnInit() : void {
    this.service.obterTodos()
      .subscribe(
        contatos => this.contatos = contatos,
        error => this.errorMessage);
  }
}
