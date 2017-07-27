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

import { Evento, Endereco, Categoria } from "../models/evento";
import { EventoService } from "../services/evento.service";

import { CurrencyUtils } from "../../common/data-type-utils/currency-utils";
import { GenericValidator } from "../../common/validation/generic-form-validator";
import { DateUtils } from "../../common/data-type-utils/date-utils";

@Component({
  selector: 'app-editar-evento',
  templateUrl: './editar-evento.component.html',
  styleUrls: ['./editar-evento.component.css']
})
export class EditarEventoComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  private myDatePickerOptions = DateUtils.getMyDatePickerOptions();

  public errors: any[] = [];
  public errorsEndereco: any[] = [];
  eventoForm: FormGroup;
  enderecoForm: FormGroup;
  evento: Evento;
  endereco: Endereco;
  categorias: Categoria[];
  eventoId: string = "";
  private sub: Subscription;
  private modalVisible: boolean;

  constructor(private fb: FormBuilder,
    private eventoService: EventoService,
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
      dataInicio: {
        required: 'Informe a data de início'
      },
      dataFim: {
        required: 'Informe a data de encerramento'
      },
      categoriaId: {
        required: 'Informe a categoria'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.evento = new Evento();
    this.evento.endereco = new Endereco();
    this.modalVisible = false;
  }

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  ngOnInit() {
    this.eventoForm = this.fb.group({
      nome: ['', [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(150)]],
      categoriaId: ['', Validators.required],
      descricaoCurta: '',
      descricaoLonga: '',
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required],
      gratuito: '',
      valor: '0',
      online: '',
      nomeEmpresa: ''
    });

    this.enderecoForm = this.fb.group({
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: '',
      bairro: ['', Validators.required],
      cep: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
    });

    this.sub = this.route.params.subscribe(
      params => {
        this.eventoId = params['id'];
        this.obterEvento(this.eventoId);
      }
    );

    this.eventoService.obterCategorias()
      .subscribe(categorias => this.categorias = categorias,
      error => this.errors);
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    Observable.merge(this.eventoForm.valueChanges, ...controlBlurs).debounceTime(100).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.eventoForm);
    });
  }

  obterEvento(id: string) {
    this.eventoService.obterEvento(id)
      .subscribe(
      evento => this.preencherFormEvento(evento),
      response => {
        if (response.status == 404) {
          this.router.navigate(['NotFound']);
        }
      });
  }

  preencherFormEvento(evento: Evento): void {
    this.evento = evento;

    let valorBrl = CurrencyUtils.ToPrice(this.evento.valor);

    this.eventoForm.patchValue({
      nome: this.evento.nome,
      categoriaId: this.evento.categoriaId,
      descricaoCurta: this.evento.descricaoCurta,
      descricaoLonga: this.evento.descricaoLonga,
      dataInicio: DateUtils.setMyDatePickerDate(this.evento.dataInicio),
      dataFim: DateUtils.setMyDatePickerDate(this.evento.dataFim),
      gratuito: this.evento.gratuito,
      valor: valorBrl,
      online: this.evento.online,
      nomeEmpresa: this.evento.nomeEmpresa,
    });

    if (this.evento.endereco) {
      this.enderecoForm.patchValue({
        logradouro: this.evento.endereco.logradouro,
        numero: this.evento.endereco.numero,
        complemento: this.evento.endereco.complemento,
        bairro: this.evento.endereco.bairro,
        cep: this.evento.endereco.cep,
        cidade: this.evento.endereco.cidade,
        estado: this.evento.endereco.estado
      });
    }
  }

  editarEvento() {
    if (this.eventoForm.dirty && this.eventoForm.valid) {
      let p = Object.assign({}, this.evento, this.eventoForm.value);
      let user = this.eventoService.obterUsuario();
      p.organizadorId = user.id;
      p.dataInicio = DateUtils.getMyDatePickerDate(p.dataInicio);
      p.dataFim = DateUtils.getMyDatePickerDate(p.dataFim);
      p.valor = CurrencyUtils.ToDecimal(p.valor);

      this.eventoService.atualizarEvento(p)
        .subscribe(
        result => { this.onSaveComplete() },
        error => {
          this.errors = JSON.parse(error._body).errors;
        });
    }
  }

  atualizarEndereco() {
    if (this.enderecoForm.dirty && this.enderecoForm.valid) {
      let p = Object.assign({}, this.endereco, this.enderecoForm.value);
      p.eventoId = this.eventoId;

      if (this.evento.endereco) {
        p.id = this.evento.endereco.id;
        this.eventoService.atualizarEndereco(p)
          .subscribe(
          result => { this.onEnderecoSaveComplete() },
          error => {
            this.errorsEndereco = JSON.parse(error._body).errors;
          });
      }
      else {
        this.eventoService.adicionarEndereco(p)
          .subscribe(
          result => { this.onEnderecoSaveComplete() },
          error => {
            this.errorsEndereco = JSON.parse(error._body).errors;
          });
      }
    }
  }

  onEnderecoSaveComplete(): void {
    this.hideModal();

    this.toastr.success('Endereco Atualizado', 'Oba :D');
    this.obterEvento(this.eventoId);
  }

  onSaveComplete(): void {
    this.errors = [];

    this.toastr.success('Evento Atualizado com Sucesso!', 'Oba :D', { dismiss: 'controlled' })
      .then((toast: Toast) => {
        setTimeout(() => {
          this.toastr.dismissToast(toast);
          this.router.navigate(['/eventos/meus-eventos']);
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
