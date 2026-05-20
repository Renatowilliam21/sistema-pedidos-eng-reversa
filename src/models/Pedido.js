export class Pedido {
  constructor() {
    this.itens = [];
    this.total = 0;
  }

  adicionarItem(item) {
    this.itens.push(item);
    this.atualizarTotal();
  }

  removerUltimoItem() {
    this.itens.pop();
    this.atualizarTotal();
  }

  atualizarTotal() {
    this.total = this.itens.reduce((soma, item) => soma + item.subtotal, 0);
  }

  limpar() {
    this.itens = [];
    this.total = 0;
  }
}