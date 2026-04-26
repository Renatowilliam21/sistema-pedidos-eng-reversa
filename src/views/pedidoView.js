export class PedidoView {
  atualizarLista(itens, total) {
    const listaCorpo = document.getElementById("lista");
    listaCorpo.innerHTML = "";

    itens.forEach((item, index) => {
      const li = document.createElement("li");
     li.innerHTML = `
      ${item.produto.nome} | Qtd: ${item.qtd} | R$ ${item.subtotal.toFixed(2)} 
      <button onclick="removerItem(${index})">X</button>
`;
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

  exibirCheckout(total) {
  document.getElementById("tela-pedido").style.display = "none";
  document.getElementById("tela-checkout").style.display = "block";
  document.getElementById("checkout-total").innerText = total.toFixed(2);
}

voltarParaPedido() {
  document.getElementById("tela-pedido").style.display = "block";
  document.getElementById("tela-checkout").style.display = "none";
}

obterDadosCheckout() {
  return {
    nome: document.getElementById("cliente-nome").value,
    fone: document.getElementById("cliente-fone").value
  };
}
}