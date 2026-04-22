class PedidoController {
  // Esta é a função que o botão do HTML vai chamar agora
  static async finalizarPedido(carrinho) {
    
    if (carrinho.itens.length === 0) {
      CarrinhoView.exibirAlerta("O carrinho está vazio!");
      return;
    }

    const totalFinal = carrinho.total;
    
    // 1. Usa o Model para criar os dados
    const novoPedido = new Pedido(carrinho.itens, totalFinal);

    try {
      // 2. Usa o Repository para salvar na Fake API (JSON Server)
      await PedidoRepository.salvar(novoPedido);
      CarrinhoView.exibirAlerta("✅ Pedido salvo com sucesso na base de dados!");

      // 3. Usa o Service para abrir a integração do WhatsApp
      const numeroPastelaria = "5588981301074";
      WhatsAppService.enviarResumo(novoPedido, numeroPastelaria);

      // 4. Salva no local storage e avisa a View para atualizar o HTML
      localStorage.setItem("ultimoPedido", totalFinal);
      carrinho.limparTudo();
      CarrinhoView.limparTela();

    } catch (erro) {
      console.error(erro);
      CarrinhoView.exibirAlerta("❌ O servidor (JSON Server) não está a rodar. Ligue o servidor no terminal.");
    }
  }
}