class ProdutoFactory {
    static criarProduto(nome) {
        let preco = 0;
        switch (nome) {
            case "pastel": preco = 5; break;
            case "caldo": preco = 7; break;
            case "refrigerante": preco = 4; break;
            case "suco": preco = 6; break;
            default: throw new Error("Produto não cadastrado");
        }
        return { nome, preco };
    }
}

class ItemPedido {
    constructor(produto, quantidade) {
        this.produto = produto.nome;
        this.quantidade = parseInt(quantidade);
        this.subtotal = produto.preco * this.quantidade;
    }
}