class ItemPedido {
    constructor(produto, qtd, precoUnitario) {
        this.produto = produto
        this.qtd = Number(qtd)
        this.precoUnitario = Number(precoUnitario)
        this.subtotal = this.calcularSubtotal()
    }

    calcularSubtotal() {
        return this.qtd * this.precoUnitario
    }

    atualizarQtd(novaQtd) {
        this.qtd = Number(novaQtd)
        this.subtotal = this.calcularSubtotal()
    }
}