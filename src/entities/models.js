export class Produto {
  #nome; #preco;
  constructor(nome, preco) {
    this.#nome = nome;
    this.#preco = preco;
  }
  getNome()  { return this.#nome; }
  getPreco() { return this.#preco; }
}

export class ItemPedido {
  #produto; #quantidade;
  constructor(produto, quantidade) {
    this.#produto = produto;
    this.#quantidade = quantidade;
  }
  getSubtotal() { return this.#produto.getPreco() * this.#quantidade; }
  toString() {
    return `${this.#produto.getNome()} | Qtd: ${this.#quantidade} | R$ ${this.getSubtotal().toFixed(2)}`;
  }
}

export class Pedido {
  #itens = [];
  adicionarItem(item) { this.#itens.push(item); }
  getItens() { return [...this.#itens]; }
  calcularTotal() { return this.#itens.reduce((soma, item) => soma + item.getSubtotal(), 0); }
  calcularDesconto() {
    const total = this.calcularTotal();
    if (total > 100) return total * 0.20;
    if (total > 50)  return total * 0.10;
    return 0;
  }
  calcularTaxa() { return this.calcularTotal() * 0.05; }
  finalizar() {
    return this.calcularTotal() - this.calcularDesconto() + this.calcularTaxa();
  }
  limpar() { this.#itens = []; }
}