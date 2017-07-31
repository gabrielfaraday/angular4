import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';

export abstract class BaseService {
  public Token: string = "";

  constructor() {  }

  protected UrlService: string = "http://localhost:54822/api/";

  protected obterAuthHeader(): RequestOptions {
    this.Token = localStorage.getItem('dnce.token');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', `Bearer ${this.Token}`);
    let options = new RequestOptions({ headers: headers });
    return options;
  }

  protected serviceError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response &&
        error.status !== 401 &&
        error.status !== 403 &&
        error.status !== 404) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    
    console.error(error);
    return Observable.throw(error);
  }

  protected extractData(response: Response) {
    let body = response.json();
    return body.data || {};
  }

}