import { Endereco } from "./endereco";
import { Telefone } from "./telefone";

export class Contato {
    id: string;
    nome: string;
    email: string;
    dataCadastro: Date;
    dataNascimento: Date;
    ativo: boolean;
    ativadoPor: string;
    enderecoId: string;
    endereco: Endereco;
    telefones: Telefone[];
    //telefoneEmAlteracao: Telefone;
}