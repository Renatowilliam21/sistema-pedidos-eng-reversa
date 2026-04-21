export class PedidoView {
  atualizarLista(itens, total) {
    const listaCorpo = document.getElementById("lista");
    listaCorpo.innerHTML = "";

    itens.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `${item.produto.nome} | Qtd: ${item.qtd} | R$ ${item.subtotal}`;
      listaCorpo.appendChild(li);
    });

    document.getElementById("total").innerText = total;
  }

  mostrarMensagem(msg) {
    alert(msg);
  }

  limparFormulario() {
    document.getElementById("qtd").value = "";
  }
}