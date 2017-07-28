import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef, ViewContainerRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

import { Router } from "@angular/router";

import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { CustomValidators, CustomFormsModule } from 'ng2-validation'

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Usuario } from "../../models/usuario";
import { UsuarioService } from "../../services/usuario.service";
import { GenericValidator } from "../../../utils/validation/generic-form-validator";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public errors: any[] = [];
  loginForm: FormGroup;
  usuario: Usuario;

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastsManager,
    vcr: ViewContainerRef) {

    this.toastr.setRootViewContainerRef(vcr);

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'E-mail invalido'
      },
      password: {
        required: 'Informe a senha',
        minlength: 'A senha deve possuir no mínimo 6 caracteres'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.usuario = new Usuario();
  }

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, CustomValidators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    Observable.merge(this.loginForm.valueChanges, ...controlBlurs).debounceTime(100).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.loginForm);
    });
  }

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      let p = Object.assign({}, this.usuario, this.loginForm.value);

      this.usuarioService.login(p)
        .subscribe(
          result => { this.onSaveComplete(result) },
          error => { this.errors = JSON.parse(error._body).errors;}
        );
    }
  }

  onSaveComplete(response: any): void {
    this.loginForm.reset();
    this.errors = [];

    localStorage.setItem('dnce.token', response.result.access_token);
    localStorage.setItem('dnce.user', JSON.stringify(response.result.user));
 
    this.toastr.success('Login efetuado com Sucesso!', 'Bem vindo!!!', { dismiss: 'controlled' })
      .then((toast: Toast) => {
        setTimeout(() => {
          this.toastr.dismissToast(toast);
          this.router.navigate(['/']);
        }, 3500);
      }); 
  }
}
