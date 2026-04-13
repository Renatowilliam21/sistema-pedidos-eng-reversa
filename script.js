class ProdutoFactory {
  static criar(tipo) {
    const precos = {
      pastel: 5,
      caldo: 7,
      refrigerante: 4,
      suco: 6
    };

    return {
      nome: tipo,
      preco: precos[tipo]
    };
  }
}


class ItemPedido {
  constructor(produto, quantidade) {
    this.produto = produto;
    this.quantidade = quantidade;
  }

  getSubtotal() {
    return this.produto.preco * this.quantidade;
  }
}

class Pedido {
  constructor() {
    if (Pedido.instancia) {
      return Pedido.instancia;
    }

    this.itens = [];
    Pedido.instancia = this;
  }

  adicionarItem(item) {
    this.itens.push(item);
  }

  removerUltimo() {
    this.itens.pop();
  }

  calcularTotal() {
    return this.itens.reduce((total, item) => {
      return total + item.getSubtotal();
    }, 0);
  }

  limpar() {
    this.itens = [];
  }
}

const pedido = new Pedido();

function adicionarItem() {
  const tipo = document.getElementById("produto").value;
  const qtd = parseInt(document.getElementById("qtd").value);

  if (!qtd || qtd <= 0) {
    alert("Quantidade inválida");
    return;
  }

  const produto = ProdutoFactory.criar(tipo);
  const item = new ItemPedido(produto, qtd);

  pedido.adicionarItem(item);

  atualizarTela();
}

function atualizarTela() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  pedido.itens.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.produto.nome} | Qtd: ${item.quantidade} | R$ ${item.getSubtotal()}
    `;
    lista.appendChild(li);
  });

  const total = pedido.calcularTotal();
  document.getElementById("total").innerText = total;

  salvarTotal(total);
}

function salvarTotal(total) {
  localStorage.setItem("total", total);
}

function finalizarPedido() {
  const total = pedido.calcularTotal();

  let desconto = 0;

  if (total > 100) {
    desconto = total * 0.2;
  } else if (total > 50) {
    desconto = total * 0.1;
  }

  const taxa = total * 0.05;
  const totalFinal = total - desconto + taxa;

  alert("Total final: R$ " + totalFinal);

  localStorage.setItem("ultimoPedido", totalFinal);

  pedido.limpar();
  atualizarTela();
}