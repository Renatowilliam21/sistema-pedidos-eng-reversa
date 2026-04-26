import Produto from '../models/Produto.js';

export default class ProdutoFactory {
  static criarProduto(tipo) {
    switch (tipo) {
      case 'pastel':
        return new Produto('pastel', 5);
      case 'caldo':
        return new Produto('caldo', 7);
      case 'refrigerante':
        return new Produto('refrigerante', 4);
      case 'suco':
        return new Produto('suco', 6);
      default:
        throw new Error('Produto inválido');
    }
  }
}
