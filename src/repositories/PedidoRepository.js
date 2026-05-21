class PedidoRepository {
  static async salvar(pedido) {
    const resposta = await fetch("http://localhost:3000/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedido)
    });

    if (!resposta.ok) {
      throw new Error("Erro ao salvar pedido no servidor.");
    }
    
    return resposta;
  }
}