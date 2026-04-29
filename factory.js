class ProdutoFactory {
  static catalogo = {
    pastel:       { nome: "Pastel",       preco: 5 },
    caldo:        { nome: "Caldo",        preco: 7 },
    refrigerante: { nome: "Refrigerante", preco: 4 },
    suco:         { nome: "Suco",         preco: 6 },
  }

  /**
   * Cria um Produto a partir de uma chave do catálogo.
   * @param {string} chave 
   * @returns {Produto}
   */
  static criar(chave) {
    const dados = ProdutoFactory.catalogo[chave]
    if (!dados) throw new Error(`Produto desconhecido: ${chave}`)
    return new Produto(dados.nome, dados.preco)
  }

  /**
   * Retorna todas as chaves disponíveis no catálogo.
   * @returns {string[]}
   */
  static listarChaves() {
    return Object.keys(ProdutoFactory.catalogo)
  }
}

class ItemPedidoFactory {
  /**
   * Cria um ItemPedido validando a quantidade antes.
   * @param {string} chaveProduto
   * @param {number} quantidade
   * @returns {ItemPedido}
   */
  static criar(chaveProduto, quantidade) {
    if (!quantidade || quantidade <= 0) {
      throw new Error("Quantidade inválida")
    }
    const produto = ProdutoFactory.criar(chaveProduto)
    return new ItemPedido(produto, Number(quantidade))
  }
}
