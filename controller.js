const pedido = Pedido.getInstance();

function adicionar() {
  const nome       = View.obterProdutoSelecionado();
  const quantidade = View.obterQuantidade();

  if (!quantidade || quantidade <= 0) {
    View.exibirMensagem('Quantidade inválida');
    return; // impede continuação com dados inválidos
  }

  const produto = ProdutoFactory.criar(nome);
  const item    = new ItemPedido(produto, quantidade);
  pedido.adicionarItem(item);

  View.renderizarLista(pedido.getItens());
  View.atualizarTotal(pedido.calcularTotal());
}

function finalizar() {
  if (pedido.getItens().length === 0) {
    View.exibirMensagem('Nenhum item no pedido.');
    return;
  }
  const totalFinal = pedido.finalizar();
  View.exibirMensagem(`Total final: R$ ${totalFinal.toFixed(2)}`);
  Repository.salvarUltimoPedido(totalFinal);
  pedido.limpar();
  View.limpar();
}

function removerUltimo() {
  pedido.removerUltimo();
  View.renderizarLista(pedido.getItens());
  View.atualizarTotal(pedido.calcularTotal());
}
