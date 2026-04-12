const pedido = new Pedido();

function adicionar() {
  const produto = document.getElementById("produto").value;
  const qtd = parseInt(document.getElementById("qtd").value);

  if (!qtd || qtd <= 0) {
    alert("Quantidade inválida");
    return;
  }

    const produtoObj = ProdutoFactory.criarProduto(produto);
    const subtotal = produtoObj.preco * qtd;

  pedido.adicionarItem({
    produto: produto,
    qtd: qtd,
    subtotal: subtotal
  });

  renderizarLista();
}

function renderizarLista() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  for (let item of pedido.itens) {
    const li = document.createElement("li");
    li.innerHTML = item.produto + " | Qtd: " + item.qtd + " | R$ " + item.subtotal;
    lista.appendChild(li);
  }

  const total = pedido.calcularTotal();
  document.getElementById("total").innerText = total;
}

function finalizar() {
  const total = pedido.calcularTotal();

  let desconto = 0;

  if (total > 100) {
    desconto = total * 0.2;
  } else if (total > 50) {
    desconto = total * 0.1;
  }

  const taxa = total * 0.05;
  const totalFinal = total - desconto + taxa;

  alert("Total final: " + totalFinal);

  localStorage.setItem("ultimoPedido", totalFinal);

  pedido.limpar();
  renderizarLista();
}