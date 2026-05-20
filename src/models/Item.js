export class Item {
  constructor(produto, qtd) {
    this.produto = produto;
    this.qtd = parseInt(qtd);
    this.preco = this.calcularPreco(produto);
    this.subtotal = this.preco * this.qtd;
  }

  calcularPreco(produto) {
    const precos = {
      pastel: 5,
      caldo: 7,
      refrigerante: 4,
      suco: 6
    };
    return precos[produto] || 0;
  }
}