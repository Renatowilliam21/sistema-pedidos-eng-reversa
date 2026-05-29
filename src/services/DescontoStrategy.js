export class StrategyDesconto {
    calcular(total) { return 0; }
}

export class DescontoMaiorQueCem extends StrategyDesconto {
    calcular(total) { return total * 0.2; }
}

export class DescontoMaiorQueCinquenta extends StrategyDesconto {
    calcular(total) { return total * 0.1; }
}

export class SemDesconto extends StrategyDesconto {
    calcular(total) { return 0; }
}

export class CalculadorDeDesconto {
    static obterStrategy(total) {
        if (total > 100) return new DescontoMaiorQueCem();
        if (total > 50) return new DescontoMaiorQueCinquenta();
        return new SemDesconto();
    }
}
