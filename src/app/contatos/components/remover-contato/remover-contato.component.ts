import { Component, OnInit, ViewContainerRef, ViewChildren, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormControlName } from "@angular/forms";

import { Subscription } from "rxjs/Subscription";
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { Contato } from "../../models/contato";
import { ContatoService } from "../../services/contatos.service";

@Component({
  selector: 'app-remover-contato',
  templateUrl: './remover-contato.component.html',
  styleUrls: ['./remover-contato.component.css']
})
export class RemoverContatoComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  private sub: Subscription;
  contatoId: string = "";
  public contato: Contato;

  constructor(private contatoService: ContatoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastsManager,
    vcr: ViewContainerRef) {

    this.toastr.setRootViewContainerRef(vcr);
    this.contato = new Contato();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        this.contatoId = params['id'];
      });

    this.contatoService.obterContato(this.contatoId)
      .subscribe(
        contato => { this.contato = contato; },
        response => {
         if (response.status == 404)
            this.router.navigate(['nao-encontrado']);
          else if (response.status == 403)
            this.router.navigate(['acesso-negado']);
          else if (response.status == 401)
            this.router.navigate(['login']);
        });
  }

  public removerContato() {
    this.contatoService.removerContato(this.contatoId)
      .subscribe(
        contato => { this.onDeleteComplete(contato) },
        error => { this.onError() }
        );
  }

  public onDeleteComplete(contato: any) {
    this.toastr.success('Contato removido com Sucesso!', 'Good bye :D', { dismiss: 'controlled' })
      .then((toast: Toast) => {
        setTimeout(() => {
          this.toastr.dismissToast(toast);
          this.router.navigate(['/contatos']);
        }, 1000);
      });
  }

  public onError() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! :(');
  }
}
