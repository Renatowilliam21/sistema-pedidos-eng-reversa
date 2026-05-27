import { Produto } from '../models/Produto.js';

export class ProdutoFactory {
  /**
   * Padrão Factory para centralizar a instanciação de produtos e encapsular a tabela de preços.
   */
  static criarProduto(tipo) {
    const tabelaPrecos = {
      pastel: 5,
      caldo: 7,
      refrigerante: 4,
      suco: 6
    };

    const preco = tabelaPrecos[tipo.toLowerCase()];
    
    if (!preco) {
      throw new Error(`Produto do tipo "${tipo}" não é comercializado.`);
    }

    // Retorna uma string capitalizada apenas para melhoria visual na exibição
    const nomeFormatado = tipo.charAt(0).toUpperCase() + tipo.slice(1);
    return new Produto(nomeFormatado, preco);
  }
}