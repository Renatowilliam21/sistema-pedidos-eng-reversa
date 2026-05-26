export class ItemPedido {
    constructor(produto, quantidade) {
        this.produto = produto;
        this.quantidade = quantidade;
    }

    get subtotal() {
        return this.produto.preco * this.quantidade;
    }
}