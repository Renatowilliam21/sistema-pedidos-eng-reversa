import ProdutoFactory from './factories/ProdutoFactory.js';
import ItemPedido from './models/ItemPedido.js';
import pedidoService from './services/PedidoService.js';

function adicionar() {
  const produtoTipo = document.getElementById("produto").value;
  const qtd = parseInt(document.getElementById("qtd").value);

  if (!qtd || qtd <= 0) {
    alert("Quantidade inválida");
    return;
  }

  const produto = ProdutoFactory.criarProduto(produtoTipo);
  const item = new ItemPedido(produto, qtd);

  const pedido = pedidoService.getPedido();
  pedido.adicionarItem(item);

  atualizarLista();
}

function atualizarLista() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  const pedido = pedidoService.getPedido();
  const itens = pedido.itens;

  for (let i = 0; i < itens.length; i++) {
    const item = itens[i];

    const li = document.createElement("li");
    li.innerHTML = item.produto.nome + " | Qtd: " + item.quantidade + " | R$ " + item.subtotal;

    lista.appendChild(li);
  }

  const total = pedido.calcularTotal();
  document.getElementById("total").innerText = total;

  localStorage.setItem("total", total);
}

function finalizar() {
  const pedido = pedidoService.getPedido();
  const totalFinal = pedido.finalizarPedido();

  alert("Total final: " + totalFinal);

  localStorage.setItem("ultimoPedido", totalFinal);

  limparTudo();
}

function limparTudo() {
  const pedido = pedidoService.getPedido();
  pedido.limpar();

  document.getElementById("lista").innerHTML = "";
  document.getElementById("total").innerText = 0;
}

function removerUltimo() {
  const pedido = pedidoService.getPedido();
  pedido.removerUltimoItem();

  atualizarLista();
}

// Expor funções para o HTML
window.adicionar = adicionar;
window.finalizar = finalizar;
window.removerUltimo = removerUltimo;
