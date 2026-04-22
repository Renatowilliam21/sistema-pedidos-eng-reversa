class CarrinhoView {
  // O Carrinho vai chamar essa função toda vez que um item for adicionado ou removido
  static atualizarTela(carrinho) {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    for (let i = 0; i < carrinho.itens.length; i++) {
      let item = carrinho.itens[i];
      let li = document.createElement("li");
      li.innerHTML = `${item.produto} | Qtd: ${item.qtd} | R$ ${item.subtotal.toFixed(2)} <button onclick="remover('${item.produto}')" class="remover">remover</button>`;
      lista.appendChild(li);
    }

    document.getElementById("total").innerText = carrinho.total.toFixed(2);
    
    // Mostra ou esconde a lista dependendo se tem itens
    if (carrinho.itens.length > 0) {
      document.getElementById("remover").style.display = "flex";
      document.getElementById("lista1").style.display = "block";
    } else {
      this.limparTela();
    }
  }

  static exibirAlerta(mensagem) {
    alert(mensagem);
  }

  static limparTela() {
    document.getElementById("lista").innerHTML = "";
    document.getElementById("total").innerText = "0";
    document.getElementById("remover").style.display = "none";
    document.getElementById("lista1").style.display = "none";
  }
}