// Estratégias isoladas
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

    return e
strategia.calcular(total);
  }
}