export class PedidoRepository {
  static instancia;

  constructor() {
    if (PedidoRepository.instancia) return PedidoRepository.instancia;
    this.key = "ultimoPedido";
    PedidoRepository.instancia = this;
  }

  salvar(totalFinal) {
    localStorage.setItem(this.key, totalFinal);
  }
}