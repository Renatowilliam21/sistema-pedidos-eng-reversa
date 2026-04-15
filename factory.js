class ProdutoFactory {
  static catalogo = {
    pastel:       5,
    caldo:        7,
    refrigerante: 4,
    suco:         6,
  };

  static criar(nome) {
    const preco = ProdutoFactory.catalogo[nome];
    if (preco === undefined)
      throw new Error(`Produto desconhecido: ${nome}`);
    return new Produto(nome, preco);
  }

  static listar() {
    return Object.keys(ProdutoFactory.catalogo);
  }
}
