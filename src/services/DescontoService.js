// Estratégias isoladas (Pattern Strategy)
class DescontoOuro {
  calcular(total) {
    return total * 0.2; // 20% de desconto
  }
}

class DescontoPrata {
  calcular(total) {
    return total * 0.1; // 10% de desconto
  }
}

class SemDesconto {
  calcular(total) {
    return 0; // 0%
  }
}

// O Service que decide qual estratégia usar
export class DescontoService {
  static aplicarDesconto(total) {
    let estrategia;

    if (total > 100) {
      estrategia = new DescontoOuro();
    } else if (total > 50) {
      estrategia = new DescontoPrata();
    } else {
      estrategia = new SemDesconto();
    }
    return estrategia.calcular(total);
    // Calcula o valor do desconto usando a estratégia definida
    const desconto = estrategia.calcular(total);
    const taxaEntrega = 5.00; // Taxa padrão exigida 

    // Retorna o valor final ajustado
    return 
total - desconto + taxaEntrega;
  }
}