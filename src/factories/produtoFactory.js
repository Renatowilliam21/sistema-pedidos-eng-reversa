import { Produto } from "../models/Produto.js";

export class ProdutoFactory {
  static criar(tipo) {
    const tabelaPrecos = {
      pastel: 5,
      caldo: 7,
      refrigerante: 4,
      suco: 6
    };

    if (!tabelaPrecos[tipo]) throw new Error("Produto inexistente");
    
    return new Produto(tipo, tabelaPrecos[tipo]);
  }
}