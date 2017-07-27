import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";

import { Subscription } from "rxjs/Subscription";

import { Evento } from "../models/evento";
import { EventoService } from "../services/evento.service";

@Component({
  selector: 'app-detalhes-evento',
  templateUrl: './detalhes-evento.component.html',
  styleUrls: ['./detalhes-evento.component.css']
})
export class DetalhesEventoComponent implements OnInit {
  private sub: Subscription;
  eventoId: string = "";
  public evento: Evento;
  public enderecoMap: any;

  constructor(private eventoService: EventoService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer ) { 
      this.evento = new Evento();
    }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        this.eventoId = params['id'];
      });

    this.eventoService.obterEvento(this.eventoId)
      .subscribe(
      evento => { 
        this.evento = evento;
        this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?q=" + this.EnderecoCompleto() + "&key=AIzaSyAP0WKpL7uTRHGKWyakgQXbW6FUhrrA5pE");
       },
      response => {
        if (response.status == 404) {
          this.router.navigate(['NotFound']);
        }
      });      
  }

  public EnderecoCompleto(): string {
    return this.evento.endereco.logradouro + ", " + this.evento.endereco.numero + " - " + this.evento.endereco.bairro + ", " + this.evento.endereco.cidade + " - " + this.evento.endereco.estado;
  }  
}
