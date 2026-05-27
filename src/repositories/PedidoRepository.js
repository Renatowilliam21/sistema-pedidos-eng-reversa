export class PedidoRepository {
  // Instância estática privada que guardará a única referência da classe
  static #instancia = null;

  constructor() {
    if (PedidoRepository.#instancia) {
      return PedidoRepository.#instancia;
    }
    PedidoRepository.#instancia = this;
  }

  /**
   * Padrão Singleton para garantir um ponto central unificado de persistência de dados.
   */
  static getInstancia() {
    if (!PedidoRepository.#instancia) {
      PedidoRepository.#instancia = new PedidoRepository();
    }
    return PedidoRepository.#instancia;
  }

  salvarTotalParcial(total) {
    localStorage.setItem("total", total.toFixed(2));
  }

  salvarPedidoFinalizado(totalFinal) {
    localStorage.setItem("ultimoPedido", totalFinal.toFixed(2));
  }
}