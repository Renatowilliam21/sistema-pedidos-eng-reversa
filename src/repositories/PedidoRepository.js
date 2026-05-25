export class PedidoRepository {
  constructor() {
    // Alterado para 127.0.0.1 para evitar o erro ERR_CONNECTION_REFUSED
    this.url = "http://127.0.0.1:3000/pedidos";
  }

  async salvarPedido(pedido, totalFinal) {
    // Isolando as propriedades puras do objeto para enviar um JSON limpo
    const pedidoParaSalvar = {
      cliente: "Cliente",
      itens: pedido.itens.map(item => ({
        produto: item.produto.nome,
        preco: item.produto.preco,
        quantidade: item.qtd,
        subtotal: item.getSubtotal()
      })),
      total: pedido.calcularTotal(),
      totalFinal: totalFinal,
      data: new Date().toLocaleString("pt-BR")
    };

    const resposta = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pedidoParaSalvar)
    });

    return resposta.json();
  }

  async listarPedidos() {
    const resposta = await fetch(this.url);

    return resposta.json();
  }
}