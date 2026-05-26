export class DescontoAcimaDe100 {
    calcular(total) { return total > 100 ? total * 0.2 : 0; }
}

export class DescontoAcimaDe50 {
    calcular(total) { return (total > 50 && total <= 100) ? total * 0.1 : 0; }
}