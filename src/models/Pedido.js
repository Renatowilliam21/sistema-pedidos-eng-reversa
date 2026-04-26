export default class Pedido {
  constructor() {
    this.itens = [];
  }

  adicionarItem(item) {
    this.itens.push(item);
  }

  removerUltimoItem() {
    this.itens.pop();
  }

  calcularTotal() {
    let total = 0;

    for (let i = 0; i < this.itens.length; i++) {
      total += this.itens[i].subtotal;
    }

    return total;
  }

  finalizarPedido() {
    let total = this.calcularTotal();
    let desconto = 0;

    if (total > 100) {
      desconto = total * 0.2;
    } else if (total > 50) {
      desconto = total * 0.1;
    }

    let taxa = total * 0.05;

    return total - desconto + taxa;
  }

  limpar() {
    this.itens = [];
  }
}
