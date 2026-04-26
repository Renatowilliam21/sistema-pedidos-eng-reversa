export class PedidoView {
  atualizarLista(itens, total) {
    const listaCorpo = document.getElementById("lista");
    const btnFinalizar = document.getElementById("btn-finalizar");
    

    listaCorpo.innerHTML = "";


    if (itens.length > 0) {
      btnFinalizar.style.display = "block"; 
    } else {
      btnFinalizar.style.display = "none";
    }


    itens.forEach((item, index) => {
      const li = document.createElement("li");
  
      li.innerHTML = `
        <span>${item.produto.nome} | Qtd: ${item.qtd} | R$ ${item.subtotal.toFixed(2)}</span>
        <button class="btn-remover" onclick="removerItem(${index})">X</button>
      `;
      listaCorpo.appendChild(li);
    });

   
    document.getElementById("total").innerText = total.toFixed(2);
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

  mostrarMensagem(msg) {
    alert(msg);
  }
}