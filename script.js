// Tudo o que está aqui dentro só existe neste bloco (escopo local)
document.addEventListener("DOMContentLoaded", () => {
  
  // 1. A variável itens agora é LOCAL e protegida.
  let itens = [];

  // 2. Capturamos os botões do HTML via JavaScript (adicione IDs a eles no seu HTML)
  const btnAdicionar = document.getElementById("btnAdicionar");
  const btnFinalizar = document.getElementById("btnFinalizar");

  function adicionar() {
    let produto = document.getElementById("produto").value;
    let qtd = document.getElementById("qtd").value;

    if (qtd == "" || qtd <= 0) {
      alert("Quantidade inválida");
      return; // Retorno adicionado para impedir que itens inválidos entrem na lista
    }

    let preco = 0;
    if (produto == "pastel") preco = 5;
    if (produto == "caldo") preco = 7;
    if (produto == "refrigerante") preco = 4;
    if (produto == "suco") preco = 6;

    let subtotal = preco * qtd;

    itens.push({
      produto: produto,
      qtd: qtd,
      subtotal: subtotal
    });

    atualizarLista();
  }

  function atualizarLista() {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    let total = 0;

    for (let i = 0; i < itens.length; i++) {
      let item = itens[i];

      let li = document.createElement("li");
      li.innerHTML = item.produto + " | Qtd: " + item.qtd + " | R$ " + item.subtotal;

      lista.appendChild(li);

      total = total + item.subtotal;
    }

    document.getElementById("total").innerText = total;
    localStorage.setItem("total", total);
  }

  function finalizar() {
    let desconto = 0;
    // Boa prática: converter o retorno do localStorage (que é string) para Número
    let total = Number(localStorage.getItem("total")); 

    if (total > 100) {
      desconto = total * 0.2;
    } else if (total > 50) {
      desconto = total * 0.1;
    }

    let taxa = total * 0.05;
    let totalFinal = total - desconto + taxa;

    alert("Total final: R$ " + totalFinal.toFixed(2));

    localStorage.setItem("ultimoPedido", totalFinal);
    limparTudo();
  }

  function limparTudo() {
    itens = []; // Como esta função está dentro do mesmo bloco, ela altera a variável local
    localStorage.setItem("total", 0);

    document.getElementById("lista").innerHTML = "";
    document.getElementById("total").innerText = 0;
  }

  // 3. Em vez de usar onclick no HTML, atrelamos os eventos aqui
  if (btnAdicionar) btnAdicionar.addEventListener("click", adicionar);
  if (btnFinalizar) btnFinalizar.addEventListener("click", finalizar);

});