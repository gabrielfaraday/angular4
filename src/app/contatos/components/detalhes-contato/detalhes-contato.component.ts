import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";

import { Subscription } from "rxjs/Subscription";

import { Contato } from "../../models/contato";
import { ContatoService } from "../../services/contatos.service";

@Component({
  selector: 'app-detalhes-contato',
  templateUrl: './detalhes-contato.component.html',
  styleUrls: ['./detalhes-contato.component.css']
})
export class DetalhesContatoComponent implements OnInit {
  private sub: Subscription;
  contatoId: string = "";
  public contato: Contato;
  
  constructor(private contatoService: ContatoService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer ) { 
      this.contato = new Contato();
    }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        this.contatoId = params['id'];
      });

    this.contatoService.obterContato(this.contatoId)
      .subscribe(
        contato => { 
          this.contato = contato;
        },
        response => {
          if (response.status == 404) {
            this.router.navigate(['NotFound']);
          }
          else if (response.status == 401) {
            this.router.navigate(['acesso-negado']);
          }
        });      
  }
}
