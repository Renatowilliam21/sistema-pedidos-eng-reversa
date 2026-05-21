class Produto {
  constructor(nome, preco){
    this.nome = nome;
    this.preco = preco;
  }
}

class Produtos {
  static criar(nomeProduto) {
    const precos = {
      "pastel": 5,
      "caldo": 7,
      "refrigerante": 4,
      "suco": 6
    };
    
    const nomeFormatado = nomeProduto ? String(nomeProduto).toLowerCase().trim() : "";
    const preco = precos[nomeFormatado] || 0; 
    
    return new Produto(String(nomeProduto), preco);
  }
}