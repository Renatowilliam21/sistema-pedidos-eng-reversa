class Produto {
  constructor(nome, preco) {
    this.nome  = nome;
    this.preco = preco;
  }
  getNome()  { return this.nome; }
  getPreco() { return this.preco; }
}

class ItemPedido {
  constructor(produto, quantidade) {
    this.produto    = produto;
    this.quantidade = quantidade;
    this.subtotal   = this.calcularSubtotal();
  }
  calcularSubtotal() {
    return this.produto.getPreco() * this.quantidade;
  }
  toString() {
    return `${this.produto.getNome()} | Qtd: ${this.quantidade} | R$ ${this.subtotal.toFixed(2)}`;
  }
}

class Pedido {
  static instancia = null;

  constructor() { this.itens = []; }

  static getInstance() {
    if (!Pedido.instancia) Pedido.instancia = new Pedido();
    return Pedido.instancia;
  }

  adicionarItem(item) { this.itens.push(item); }
  removerUltimo()     { this.itens.pop(); }
  getItens()          { return this.itens; }

  calcularTotal() {
    return this.itens.reduce((soma, item) => soma + item.subtotal, 0);
  }

  calcularDesconto(total) {
    if (total > 100) return total * 0.2;
    if (total > 50)  return total * 0.1;
    return 0;
  }

  calcularTaxa(total) { return total * 0.05; }

  finalizar() {
    const total    = this.calcularTotal();
    const desconto = this.calcularDesconto(total);
    const taxa     = this.calcularTaxa(total);
    return total - desconto + taxa;
  }

  limpar() { this.itens = []; }
}
