import { ItemPedido } from './entities/models.js'; 
import { ProdutoFactory, PedidoManager } from './services/services.js';

function adicionar() {
  const tipo = document.getElementById("produto").value;
  const qtd = parseInt(document.getElementById("qtd").value);

  if (!qtd || qtd <= 0) {
    alert("Quantidade inválida");
    return;
  }

  try {
    const produto = ProdutoFactory.criar(tipo);
    const item = new ItemPedido(produto, qtd);
    const manager = PedidoManager.getInstance();

    manager.getPedido().adicionarItem(item);
    manager.salvar();

    atualizarUI();
    document.getElementById("qtd").value = "";
  } catch (e) {
    alert(e.message);
  }
}

function finalizar() {
  const manager = PedidoManager.getInstance();
  const pedido = manager.getPedido();

  if (pedido.getItens().length === 0) {
    alert("Nenhum item no pedido.");
    return;
  }

  const totalFinal = pedido.finalizar();
  alert(`Total final: R$ ${totalFinal.toFixed(2)}`);

  manager.novoPedido();
  atualizarUI();
}

function atualizarUI() {
  const pedido = PedidoManager.getInstance().getPedido();
  const lista = document.getElementById("lista");

  lista.innerHTML = "";
  pedido.getItens().forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.toString();
    lista.appendChild(li);
  });

  document.getElementById("total").innerText = pedido.calcularTotal().toFixed(2);
}

document.getElementById("adicionar").addEventListener("click", adicionar);
document.getElementById("finalizar").addEventListener("click", finalizar);