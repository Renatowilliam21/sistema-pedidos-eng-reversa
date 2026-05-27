export class Pedido {
  constructor() {
    this.itens = [];
    this.totalOriginal = 0;
  }

  adicionarItem(itemPedido) {
    this.itens.push(itemPedido);
    this.atualizarTotalOriginal();
  }

  atualizarTotalOriginal() {
    this.totalOriginal = this.itens.reduce((soma, item) => soma + item.subtotal, 0);
  }

  calcularDesconto() {
    if (this.totalOriginal > 100) {
      return this.totalOriginal * 0.2; // 20% de desconto
    } else if (this.totalOriginal > 50) {
      return this.totalOriginal * 0.1; // 10% de desconto
    }
    return 0;
  }

  calcularTaxa() {
    return this.totalOriginal * 0.05; // 5% de taxa de serviço
  }

  calcularTotalFinal() {
    return this.totalOriginal - this.calcularDesconto() + this.calcularTaxa();
  }
}