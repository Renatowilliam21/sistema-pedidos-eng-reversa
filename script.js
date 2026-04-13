// responsável por gerenciar os pedidos
const PedidoService = {
  itens: [],

  adicionarItem(item) {
    this.itens.push(item);
  },

  removerUltimo() {
    this.itens.pop();
  },

  calcularTotal() {
    return this.itens.reduce((soma, item) => soma + item.subtotal, 0);
  },

  limpar() {
    this.itens = [];
  }
};

let itens = [];
let total = 0;

function adicionar() {
  let produto = document.getElementById("produto").value;
  let qtd = document.getElementById("qtd").value;

  if (qtd == "" || qtd <= 0) {
    alert("Quantidade inválida");
    return;
  }

  let preco = 0;

  if (produto == "Pastel") preco = 5;
  if (produto == "Caldo") preco = 3;
  if (produto == "Refrigerante") preco = 5;
  if (produto == "Suco") preco = 4;

  let subtotal = preco * qtd;

  let item = {
    produto,
    qtd,
    subtotal
  };

  PedidoService.adicionarItem(item);

  atualizarLista();
}
function atualizarLista() {
  let lista = document.getElementById("Lista");
  lista.innerHTML = "";

  let itens = PedidoService.itens;

  for (let i = 0; i < itens.length; i++) {
    let item = itens[i];

    let li = document.createElement("li");
    li.innerHTML = item.produto + " | Qtd: " + item.qtd + " | R$ " + item.subtotal;

    lista.appendChild(li);
  }

  let total = PedidoService.calcularTotal();

  document.getElementById("Total").innerText = total;

  salvarTotal(total);
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
  let soma = 0;

  for (let i = 0; i < itens.length; i++) {
    soma += itens[i].subtotal;
  }

  return soma;
}