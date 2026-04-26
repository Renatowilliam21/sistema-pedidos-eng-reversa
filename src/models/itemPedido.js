export class ItemPedido {
  constructor(produto, qtd) {
    this.produto = produto; // Objeto da classe Produto
    this.qtd = parseInt(qtd);
    this.subtotal = this.produto.preco * this.qtd;
  }
}