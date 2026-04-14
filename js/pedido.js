class Pedido {
  constructor() {
    if (Pedido.instance) {
      return Pedido.instance;
    }

    this.itens = [];
    Pedido.instance = this;
  }

  adicionarItem(item) {
    this.itens.push(item);
  }

  removerUltimo() {
    this.itens.pop();
  }

  calcularTotal() {
    return this.itens.reduce((total, item) => total + item.subtotal, 0);
  }

  limpar() {
    this.itens = [];
  }
}