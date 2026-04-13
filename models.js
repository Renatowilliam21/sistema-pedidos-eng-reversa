class Produto {
  constructor(nome, preco) {
    this.nome = nome
    this.preco = preco
  }
}

class ItemPedido {
  constructor(produto, quantidade) {
    this.produto = produto
    this.quantidade = quantidade
    this.subtotal = produto.preco * quantidade
  }
}

class Pedido {
  constructor() {
    this.itens = []
  }

  adicionarItem(item) {
    this.itens.push(item)
  }

  removerUltimoItem() {
    this.itens.pop()
  }

  calcularTotal() {
    return this.itens.reduce((soma, item) => soma + item.subtotal, 0)
  }

  calcularDesconto(total) {
    if (total > 100) return total * 0.2
    if (total > 50) return total * 0.1
    return 0
  }

  calcularTaxaServico(total) {
    return total * 0.05
  }

  calcularTotalFinal() {
    const total = this.calcularTotal()
    const desconto = this.calcularDesconto(total)
    const taxa = this.calcularTaxaServico(total)
    return total - desconto + taxa
  }

  limpar() {
    this.itens = []
  }
}
