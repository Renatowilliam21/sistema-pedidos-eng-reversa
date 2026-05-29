export class ItemPedido {
    constructor(produto, quantidade) {
        this.produto = produto;
        this.quantidade = Number(quantidade);
        this.subtotal = this.calcularSubtotal();
    }

    calcularSubtotal() {
        return this.produto.preco * this.quantidade;
    }
}
