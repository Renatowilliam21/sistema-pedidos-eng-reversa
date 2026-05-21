class SemDesconto {
    calcular(total) {
        return total
    }
}

class DescontoPercentual {
    constructor(porcentagem) {
        this.porcentagem = porcentagem
    }
    
    calcular(total) {
        const desconto = total * (this.porcentagem / 100)
        return total - desconto
    }
}