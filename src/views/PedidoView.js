export class PedidoView {
  constructor() {
    this.selectProduto = document.getElementById("produto");
    this.inputQuantidade = document.getElementById("qtd");
    this.containerLista = document.getElementById("lista");
    this.containerTotal = document.getElementById("total");
    this.btnAdicionar = document.getElementById("btnAdicionar");
    this.btnFinalizar = document.getElementById("btnFinalizar");
  }

  obterDadosFormulario() {
    return {
      tipoProduto: this.selectProduto.value,
      quantidade: this.inputQuantidade.value
    };
  }

  limparCamposFormulario() {
    this.inputQuantidade.value = "";
  }

  exibirMensagem(mensagem) {
    alert(mensagem);
  }

  renderizar(pedido) {
    // Atualiza a listagem de itens na tela
    this.containerLista.innerHTML = "";
    
    pedido.itens.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.produto.nome} | Qtd: ${item.quantidade} | R$ ${item.subtotal.toFixed(2)}`;
      this.containerLista.appendChild(li);
    });

    // Atualiza o display do valor total parcial acumulado
    this.containerTotal.innerText = pedido.totalOriginal.toFixed(2);
  }

  limparTela() {
    this.containerLista.innerHTML = "";
    this.containerTotal.innerText = "0";
  }
}