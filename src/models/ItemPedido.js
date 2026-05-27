export class ItemPedido {
  constructor(produto, quantidade) {
    this.produto = produto; // Instância de Produto
    this.quantidade = parseInt(quantidade);
    this.subtotal = this.calcularSubtotal();
  }

  calcularSubtotal() {
    return this.produto.preco * this.quantidade;
  }
}