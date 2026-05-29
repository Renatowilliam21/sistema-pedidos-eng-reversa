import { Produto } from '../models/Produto.js';

export class ProdutoFactory {
    static criarProduto(tipo) {
        switch (tipo) {
            case 'pastel':
                return new Produto(1, 'Pastel', 5.00);
            case 'caldo':
                return new Produto(2, 'Caldo', 7.00);
            case 'refrigerante':
                return new Produto(3, 'Refrigerante', 4.00);
            case 'suco':
                return new Produto(4, 'Suco', 6.00);
            default:
                throw new Error("Produto não encontrado");
        }
    }
}
