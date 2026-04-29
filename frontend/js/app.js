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

async function finalizar() {
  if (pedido.itens.length === 0) {
    alert("Adicione itens antes de finalizar!");
    return;
  }

  const dadosPedido = {
    itens: pedido.itens.map(item => ({
      produto: item.produto,
      preco: item.subtotal / item.qtd,
      qtd: item.qtd
    }))
  };

  try {
    const response = await fetch('/backend/api.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosPedido)
    });

    const resultado = await response.json();

    if (resultado.status === "sucesso") {
      let mensagem = " *Novo Pedido - Pastelaria do Zé* \n\n";
      mensagem += `*ID:* ${resultado.pedido_id}\n\n`;
      mensagem += "*Itens:*\n";
      
      pedido.itens.forEach(item => {
        mensagem += `- ${item.qtd}x ${item.produto} (R$ ${item.subtotal.toFixed(2)})\n`;
      });
      
      mensagem += `\n*Total a pagar: R$ ${pedido.calcularTotal().toFixed(2)}*`;

      const numeroWhatsApp = "5588999999999"; 
      const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
      
      alert("Pedido salvo no sistema! Redirecionando para o WhatsApp...");
      window.open(linkWhatsApp, '_blank');

      pedido.limpar();
      renderizarLista();
    } else {
      alert("Erro ao salvar pedido no servidor.");
    }
  } catch (error) {
    console.error("Erro na integração:", error);
    alert("Não foi possível conectar ao servidor PHP.");
  }
}