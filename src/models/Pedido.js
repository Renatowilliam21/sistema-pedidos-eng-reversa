export class Pedido {
    constructor() {
        this.itens = [];
        this.total = 0;
    }

    adicionarItem(itemPedido) {
        this.itens.push(itemPedido);
        this.calcularTotal();
    }

    removerItem(index) {
        this.itens.splice(index, 1);
        this.calcularTotal();
    }

    calcularTotal() {
        this.total = this.itens.reduce((soma, item) => soma + item.subtotal, 0);
        return this.total;
    }
}
