class ProdutoFactory {
  static criarProduto(nome) {
    const precos = {
      pastel: 5,
      caldo: 7,
      refrigerante: 4,
      suco: 6
    };

    return new Produto(nome, precos[nome]);
  }
}
class Produto{
  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco;
  }
}
class ItemPedido {
  constructor(produto, qtd) {
    this.produto = produto;
    this.qtd = qtd;
  }

  getSubtotal() {
    return this.produto.preco * this.qtd;
  }
}
class Pedido {
  constructor() {
    this.itens = [];
  }

  adicionarItem(item) {
    this.itens.push(item);
  }

  calcularTotal() {
    let total = 0;

    for (let i = 0; i < this.itens.length; i++) {
      total += this.itens[i].getSubtotal();
    }

    return total;
  }
}

let pedido = new Pedido();



function adicionar() {
  let produto = document.getElementById("produto").value;
  let qtd = document.getElementById("qtd").value;

  if (qtd == "" || qtd <= 0) {
    alert("Quantidade inválida");
    return;
  }

  let produtoObj = ProdutoFactory.criarProduto(produto);

  let item = new ItemPedido(produtoObj, qtd);
  pedido.adicionarItem(item);

  atualizarLista();
}

function atualizarLista() {
  let lista = document.getElementById("lista");
  lista.innerHTML = "";

  for (let i = 0; i < pedido.itens.length; i++) {
  let item = pedidos.itens[i];
  
  let li = document.createElement("li");
  li.innerHTML = item.produto.nome + " | Qtd: " + item.qtd + " | R$ " + item.getSubtotal();

  lista.appendChild(li);
}

total = pedido.calcularTotal();

  document.getElementById("total").innerText = total;

  salvarTotal();
}

function salvarTotal() {
  // duplicação de responsabilidade
  localStorage.setItem("total", total);
}

function finalizar() {
  let desconto = 0;

  if (total > 100) {
    desconto = total * 0.2;
  } else if (total > 50) {
    desconto = total * 0.1;
  }

  let taxa = total * 0.05;

  let totalFinal = total - desconto + taxa;

  alert("Total final: " + totalFinal);

  localStorage.setItem("ultimoPedido", totalFinal);

  limparTudo();
}

function limparTudo() {
  itens = [];
  total = 0;

  document.getElementById("lista").innerHTML = "";
  document.getElementById("total").innerText = 0;
}

function removerUltimo() {
  itens.pop();
  atualizarLista();
}

// função duplicada de cálculo (problema proposital)
function calcularTotal() {
  return pedido.calcularTotal();
}