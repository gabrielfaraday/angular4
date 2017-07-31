import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, ViewContainerRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Router } from "@angular/router";

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { IMyOptions, IMyDateModel } from 'mydatepicker';

import { DateUtils } from "../../../utils/data-types-utils/date-utils";
import { Contato } from "../../models/contato";

import { ContatoService } from "../../services/contatos.service";
import { GenericValidator } from "../../../utils/validation/generic-form-validator";
import { Endereco } from "../../models/endereco";
import { CustomValidators } from "ng2-validation/dist";

@Component({
  selector: 'app-adicionar-contato',
  templateUrl: './adicionar-contato.component.html',
  styleUrls: ['./adicionar-contato.component.css']
})

export class AdicionarContatoComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  private myDatePickerOptions = DateUtils.getMyDatePickerOptions();
  
  public errors: any[] = [];
  contatoForm: FormGroup;
  contato: Contato;

  constructor(private fb: FormBuilder,
    private contatoService: ContatoService,
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
      email: {
        required: 'Informe o e-mail',
        email: 'E-mail invalido'
      },
      logradouro: {
        required: 'Informe o logradouro'
      },
      numero: {
        required: 'Informe o número'
      },
      bairro: {
        required: 'Informe o bairro'
      },
      cep: {
        required: 'Informe o cep'
      },
      cidade: {
        required: 'Informe o cidade'
      },
      estado: {
        required: 'Informe o estado'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.contato = new Contato();
    this.contato.endereco = new Endereco();
  } 

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  ngOnInit(): void {
    this.contatoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      email: ['', [Validators.required, CustomValidators.email]],
      dataNascimento: '',
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: '',
      bairro: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]]
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    Observable.merge(this.contatoForm.valueChanges, ...controlBlurs).debounceTime(100).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.contatoForm);
    });
  }

  adicionarContato() {
    if (this.contatoForm.dirty && this.contatoForm.valid) {
      let user = this.contatoService.obterUsuario();

      let p = Object.assign({}, this.contato, this.contatoForm.value);

      p.dataNascimento = DateUtils.getMyDatePickerDate(p.dataNascimento);
      
      p.endereco.logradouro = p.logradouro;
      p.endereco.numero = p.numero;
      p.endereco.complemento = p.complemento;
      p.endereco.bairro = p.bairro;
      p.endereco.cep = p.cep;
      p.endereco.cidade = p.cidade;
      p.endereco.estado = p.estado;

      this.contatoService.adicionarContato(p)
        .subscribe(
          result => { this.onSaveComplete(result) },
          error => { this.onError(error); }
        );
    }
  }

  onError(error) {
    this.toastr.error('Ocorreu um erro no processamento', 'Ops! :(');    
    this.errors = JSON.parse(error._body).errors;
  }

  onSaveComplete(contato: Contato): void {
    this.contatoForm.reset();
    this.errors = [];

    this.toastr.success('Contato Registrado com Sucesso!', 'Oba :D', { dismiss: 'controlled' })
      .then((toast: Toast) => {
        setTimeout(() => {
          this.toastr.dismissToast(toast);
          this.router.navigate(['/contatos/alterar/' + contato.id]);
        }, 2500);
      });
  }
}
