import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef, ViewContainerRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

import { Router } from "@angular/router";

import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { CustomValidators, CustomFormsModule } from 'ng2-validation'
// import { UUID } from 'angular2-uuid';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Usuario } from "../../models/usuario";
import { UsuarioService } from "../../services/usuario.service";
import { GenericValidator } from "../../../utils/validation/generic-form-validator";

@Component({
  selector: 'app-registro',
  templateUrl: './registrar-usuario.component.html'
})

export class RegistrarUsuarioComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public errors: any[] = [];
  registroForm: FormGroup;
  usuario: Usuario;

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastsManager,
    vcr: ViewContainerRef) {

    this.toastr.setRootViewContainerRef(vcr);

    this.validationMessages = {
      nome: {
        required: 'O Nome é requerido.',
        minlength: 'O Nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O Nome precisa ter no máximo 150 caracteres'
      },
      cpf: {
        required: 'Informe o CPF',
        rangeLength: 'CPF deve conter 11 caracteres'
      },
      email: {
        required: 'Informe o e-mail',
        email: 'E-mail invalido'
      },
      password: {
        required: 'Informe a senha',
        minlength: 'A senha deve possuir no mínimo 4 caracteres'
      },
      confirmPassword: {
        required: 'Informe a senha novamente',
        minlength: 'A senha deve possuir no mínimo 4 caracteres',
        equalTo: 'As senhas não conferem'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.usuario = new Usuario();
  }

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  ngOnInit(): void {
    let senha = new FormControl('', [Validators.required, Validators.minLength(6)]);
    let senhaConfirmacao = new FormControl('', [Validators.required, Validators.minLength(6), CustomValidators.equalTo(senha)]);

    this.registroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      cpf: ['', [Validators.required, CustomValidators.rangeLength([11, 11])]],
      email: ['', [Validators.required, CustomValidators.email]],
      password: senha,
      confirmPassword: senhaConfirmacao
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    Observable.merge(this.registroForm.valueChanges, ...controlBlurs).debounceTime(300).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.registroForm);
    });
  }

  registrar() {
    if (this.registroForm.dirty && this.registroForm.valid) {
      let p = Object.assign({}, this.usuario, this.registroForm.value);
      //p.id = UUID.UUID();

      this.usuarioService.registrar(p)
        .subscribe(
          result => { this.onSaveComplete(result) },
          error => { this.errors = JSON.parse(error._body).errors; }
        );
    }
  }

  onSaveComplete(response: any): void {
    this.registroForm.reset();
    this.errors = [];
    
    localStorage.setItem('dnce.token', response.result.access_token);
    localStorage.setItem('dnce.user', JSON.stringify(response.result.user));

    this.toastr.success('Registro realizado com Sucesso!', 'Bem vindo!!!', { dismiss: 'controlled' })
      .then((toast: Toast) => {
        setTimeout(() => {
          this.toastr.dismissToast(toast);
          this.router.navigate(['/']);
        }, 3500);
      });
  }

  // ngOnDestroy(): void {
  //   //throw new Error('Method not implemented.');
  // }
}
