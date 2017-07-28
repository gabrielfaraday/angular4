import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef, ViewContainerRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { IMyOptions } from "mydatepicker";
import { DateUtils } from "../../../utils/data-types-utils/date-utils";

import { Contato } from "../../models/contato";
import { Endereco } from "../../models/endereco";
import { Telefone } from "../../models/telefone";

import { ContatoService } from "../../services/contatos.service";

import { GenericValidator } from "../../../utils/validation/generic-form-validator";
import { CustomValidators } from "ng2-validation/dist";

@Component({
  selector: 'app-alterar-contato',
  templateUrl: './alterar-contato.component.html',
  styleUrls: ['./alterar-contato.component.css']
})
export class AlterarContatoComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  private myDatePickerOptions = DateUtils.getMyDatePickerOptions();

  public errors: any[] = [];
  public errorsEndereco: any[] = [];
  contatoForm: FormGroup;
  telefoneForm: FormGroup;
  contato: Contato;
  endereco: Endereco;
  telefone: Telefone;
  contatoId: string = "";
  private sub: Subscription;
  private modalVisible: boolean;

  constructor(private fb: FormBuilder,
    private contatoService: ContatoService,
    private router: Router,
    private route: ActivatedRoute,
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
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.contato = new Contato();
    this.contato.endereco = new Endereco();
    this.contato.telefones = new Array<Telefone>();
    this.modalVisible = false;
  }

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  ngOnInit() {
    this.contatoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      email: ['', [Validators.required, CustomValidators.email]],
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: '',
      bairro: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]]
    });

    this.telefoneForm = this.fb.group({
      ddd: ['', Validators.required],
      numero: ['', Validators.required]
    });

    this.sub = this.route.params.subscribe(
      params => {
        this.contatoId = params['id'];
        this.obterContato(this.contatoId);
      }
    );
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    Observable.merge(this.contatoForm.valueChanges, ...controlBlurs).debounceTime(100).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.contatoForm);
    });
  }

  obterContato(id: string) {
    this.contatoService.obterContato(id)
      .subscribe(
        contato => this.preencherFormContato(contato),
        response => {
          if (response.status == 404) {
            this.router.navigate(['NotFound']);
          }
        });
  }

  preencherFormContato(contato: Contato): void {
    this.contato = contato;

    this.contatoForm.patchValue({
      nome: this.contato.nome,
      email: this.contato.email,
      dataNascimento: DateUtils.setMyDatePickerDate(this.contato.dataNascimento),
      logradouro: this.contato.endereco.logradouro,
      numero: this.contato.endereco.numero,
      complemento: this.contato.endereco.complemento,
      bairro: this.contato.endereco.bairro,
      cep: this.contato.endereco.cep,
      cidade: this.contato.endereco.cidade,
      estado: this.contato.endereco.estado
    });

    // if (this.contato.telefones.some) {
    //   this.telefoneForm.patchValue({
    //     ddd: this.evento.endereco.logradouro,
    //     numero: this.evento.endereco.numero,
    //   });
    // }
  }

  alterarContato() {
    if (this.contatoForm.dirty && this.contatoForm.valid) {
      let p = Object.assign({}, this.contato, this.contatoForm.value);
      let user = this.contatoService.obterUsuario();
      
      //p.organizadorId = user.id;
      p.dataNascimento = DateUtils.getMyDatePickerDate(p.dataNascimento);

      this.contatoService.alterarContato(p)
        .subscribe(
          result => { this.onSaveComplete() },
          error => {
            this.errors = JSON.parse(error._body).errors;
          });
    }
  }

  alterarTelefone() {
    if (this.telefoneForm.dirty && this.telefoneForm.valid) {
      let p = Object.assign({}, this.endereco, this.telefoneForm.value);
      p.contatoId = this.contatoId;

      if (this.contato.telefoneEmAlteracao) {
        p.id = this.contato.telefoneEmAlteracao.id;
        this.contatoService.alterarTelefone(p)
          .subscribe(
            result => { this.onTelefoneSaveComplete() },
            error => {
              this.errorsEndereco = JSON.parse(error._body).errors;
            });
      }
      else {
        this.contatoService.adicionarTelefone(p)
          .subscribe(
            result => { this.onTelefoneSaveComplete() },
            error => {
              this.errorsEndereco = JSON.parse(error._body).errors;
            });
      }
    }
  }

  onTelefoneSaveComplete(): void {
    this.hideModal();

    this.toastr.success('Telefone Atualizado', 'Oba :D');
    this.obterContato(this.contatoId);
  }

  onSaveComplete(): void {
    this.errors = [];

    this.toastr.success('Contato Atualizado com Sucesso!', 'Oba :D', { dismiss: 'controlled' })
      .then((toast: Toast) => {
        setTimeout(() => {
          this.toastr.dismissToast(toast);
          this.router.navigate(['/contatos']);
        }, 2500);
      });
  }

  public showModal(): void {
    this.modalVisible = true;
  }

  public hideModal(): void {
    this.modalVisible = false;
  }
}
