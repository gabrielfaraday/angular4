import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { SeoService, SeoModel } from '../../services/seo.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Evento, Endereco } from "../models/evento";
import { EventoService } from "../services/evento.service";

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css']
})
export class ListaEventosComponent implements OnInit {
  public eventos: Evento[];
  errorMessage: string;

  constructor(seoService: SeoService, public service: EventoService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);

    let seoModel: SeoModel = <SeoModel>{
      title: 'Próximos Eventos',
      description: 'Lista dos próximos eventos técnicos no Brasil',
      robots: 'Index, Follow',
      keywords: 'eventos,workshops,encontros,congressos'
    };

    seoService.setSeoData(seoModel);    
  }

  ngOnInit() : void {
    this.service.obterTodos()
      .subscribe(eventos => this.eventos = eventos,
      error => this.errorMessage);
  }
}
