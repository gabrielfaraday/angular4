import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BaseService } from "../../shared/services/base.service";
import { Contato } from "../models/contato";
import { Telefone } from "../models/telefone";

@Injectable()
export class ContatoService extends BaseService {

  constructor(private http: Http) { super(); }

  obterTodos(): Observable<Contato[]> {
    return this.http.get(this.UrlService + "contatos")
      .map((res: Response) => <Contato[]>res.json())
      .catch(super.serviceError);
  }

  obterContato(id: string): Observable<Contato> {
    let options = this.obterAuthHeader();

    return this.http.get(this.UrlService + "/contatos/" + id, options)
      .map((res: Response) => <Contato[]>res.json())
      .catch(super.serviceError);
  }

  adicionarContato(contato: Contato): Observable<Contato> {
    let options = this.obterAuthHeader();

    let response = this.http
      .post(this.UrlService + "contatos", contato, options)
      .map(super.extractData)
      .catch((super.serviceError));

    return response;
  };

  alterarContato(contato: Contato): Observable<Contato> {
    let options = this.obterAuthHeader();

    let response = this.http
      .put(this.UrlService + "contatos", contato, options)
      .map(super.extractData)
      .catch((super.serviceError));
    return response;
  };

  removerContato(id: string): Observable<Contato> {
    let options = this.obterAuthHeader();

    let response = this.http
      .delete(this.UrlService + "contatos/" + id, options)
      .map(super.extractData)
      .catch((super.serviceError));
    return response;
  };

  adicionarTelefone(telefone: Telefone): Observable<Telefone> {
    let options = this.obterAuthHeader();

    let response = this.http
      .post(this.UrlService + "telefone", telefone, options)
      .map(super.extractData)
      .catch((super.serviceError));
    return response;
  };

  alterarTelefone(telefone: Telefone): Observable<Telefone> {
    let options = this.obterAuthHeader();

    let response = this.http
      .put(this.UrlService + "telefone", telefone, options)
      .map(super.extractData)
      .catch((super.serviceError));
    return response;
  };
}


