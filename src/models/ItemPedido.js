export default class ItemPedido {
  constructor(produto, quantidade) {
    this.produto = produto;
    this.quantidade = quantidade;
    this.subtotal = this.calcularSubtotal();
  }

  calcularSubtotal() {
    return this.produto.preco * this.quantidade;
  }
}
