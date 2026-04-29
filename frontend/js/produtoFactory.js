class ProdutoFactory {
  static criarProduto(tipo) {
    const precos = {
      pastel: 5,
      caldo: 7,
      refrigerante: 4,
      suco: 6
    };

    return {
      nome: tipo,
      preco: precos[tipo]
    };
  }
}