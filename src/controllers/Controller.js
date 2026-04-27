class PedidoController {
  static async finalizarPedido(carrinho) {
    
    if (carrinho.itens.length === 0) {
      CarrinhoView.exibirAlerta("O carrinho está vazio!");
      return;
    }

    const totalFinal = carrinho.total;
    
    const novoPedido = new Pedido(carrinho.itens, totalFinal);

    try {
      await PedidoRepository.salvar(novoPedido);

      const numeroPastelaria = "5588981301074";
      WhatsAppService.enviarResumo(novoPedido, numeroPastelaria);

      localStorage.setItem("ultimoPedido", totalFinal);
      carrinho.limparTudo();
      CarrinhoView.limparTela();

    } catch (erro) {
      console.error(erro);
      CarrinhoView.exibirAlerta("O servidor não está a rodando. Ligue o servidor no terminal.");
    }
  }
}