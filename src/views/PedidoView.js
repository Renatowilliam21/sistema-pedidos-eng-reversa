export class PedidoView {
 
  getDadosInput() {
    return {
      produto: document.getElementById("produto").value,
      qtd: document.getElementById("qtd").value
    };
  }


  renderizar(pedido) {
    const listaHtml = document.getElementById("lista");
    listaHtml.innerHTML = "";

    pedido.itens.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `🍕 ${item.produto} | Qtd: ${item.qtd} | R$ ${item.subtotal.toFixed(2)}`;
      listaHtml.appendChild(li);
    });

    document.getElementById("total").innerText = pedido.total.toFixed(2);
  }


  limparInputs() {
    document.getElementById("qtd").value = "";
  }


  mostrarMensagem(mensagem) {
    alert(mensagem);
  }
}