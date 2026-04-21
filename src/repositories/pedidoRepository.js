export class PedidoRepository {
  static instancia;

  constructor() {
    if (PedidoRepository.instancia) return PedidoRepository.instancia;
    this.url = "http://localhost:3000/pedidos";
    PedidoRepository.instancia = this;
  }

  async salvar(pedido) {
    try {
      const resposta = await fetch(this.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });
      return await resposta.json();
    } catch (erro) {
      console.error("Erro ao conectar com o JSON Server:", erro);
    }
  }
}