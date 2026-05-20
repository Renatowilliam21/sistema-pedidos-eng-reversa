export class PedidoRepository {
  constructor() {
    this.apiUrl = "http://localhost:3000/pedidos"; 
  }

  async salvarPedido(pedidoDados) {
    try {
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(pedidoDados)
      });
      return await response.json();
    } catch (error) {
      console.error("Erro ao salvar no JSON Server:", error);
   
      localStorage.setItem("ultimoPedido", JSON.stringify(pedidoDados));
    }
  }
}