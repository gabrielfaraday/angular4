import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { BaseService } from "../../shared/services/base.service";
import { Usuario } from "../models/usuario";

@Injectable()
export class UsuarioService extends BaseService {

  constructor(private http: Http) { super(); }

  registrar(usuario: Usuario): Observable<Usuario> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let response = this.http
      .post(this.UrlService + "registrar ", usuario, options)
      .map(super.extractData)
      .catch((super.serviceError));
    return response;
  };

  login(usuario: Usuario): Observable<Usuario> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let response = this.http
      .post(this.UrlService + "login ", usuario, options)
      .map(super.extractData)
      .catch((super.serviceError));
    return response;
  };
}


