export class ItemPedido {
    constructor(produto, quantidade) {
        this.produto = produto; 
        this.quantidade = parseInt(quantidade, 10);
    }

    get subtotal() {
        return this.produto.preco * this.quantidade;
    }
}