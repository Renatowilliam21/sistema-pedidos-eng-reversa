class CarrinhoView {
  static atualizarTela(carrinho) {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    for (let i = 0; i < carrinho.itens.length; i++) {
      let item = carrinho.itens[i];
      let li = document.createElement("li");
      li.innerHTML = `<p>${item.produto} | Qtd: ${item.qtd} | R$ ${item.subtotal.toFixed(2)}</p> <button onclick="remover('${item.produto}')" class="remover">remover</button>`;
      lista.appendChild(li);
    }

    document.getElementById("total").innerText = carrinho.total.toFixed(2);
    
    if (carrinho.itens.length > 0) {
      document.getElementById("remover").style.display = "flex";
      document.getElementById("lista1").style.display = "block";
      document.getElementById("inputs").style.display = "flex"
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
    document.getElementById("inputs").style.display = "none"
    document.getElementById("mensagem").style.display = "none"
  }
}