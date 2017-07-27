import { Component, OnInit, ViewContainerRef, ViewChildren, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormControlName } from "@angular/forms";

import { Subscription } from "rxjs/Subscription";
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';

import { Evento } from "../models/evento";
import { EventoService } from "../services/evento.service";

@Component({
  selector: 'app-excluir-evento',
  templateUrl: './excluir-evento.component.html',
  styleUrls: ['./excluir-evento.component.css']
})
export class ExcluirEventoComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  private sub: Subscription;
  eventoId: string = "";
  public evento: Evento;

  constructor(private eventoService: EventoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastsManager,
    vcr: ViewContainerRef) {

    this.toastr.setRootViewContainerRef(vcr);
    this.evento = new Evento();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        this.eventoId = params['id'];
      });

    this.eventoService.obterEvento(this.eventoId)
      .subscribe(
      evento => { this.evento = evento; },
      response => {
        if (response.status == 404) {
          this.router.navigate(['/NotFound']);
        }
      });
  }

  public excluirEvento() {
    this.eventoService.excluirEvento(this.eventoId)
      .subscribe(
      evento => { this.onDeleteComplete(evento) },
      error => { this.onError() }
      );
  }

  public onDeleteComplete(evento: any) {
    this.toastr.success('Evento excluido com Sucesso!', 'Good bye :D', { dismiss: 'controlled' })
      .then((toast: Toast) => {
        setTimeout(() => {
          this.toastr.dismissToast(toast);
          this.router.navigate(['/eventos/meus-eventos']);
        }, 2500);
      });
  }

  public onError() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}
