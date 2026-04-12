let itens = [];
let total = 0; //variáveis globais que são usadas ao longo de todo o código

function adicionar() {
  let produto = document.getElementById("produto").value; //dependencia da integridade dos ids do html 
  let qtd = document.getElementById("qtd").value;

  if (qtd == "" || qtd <= 0) {
    alert("Quantidade inválida"); //validação
  }

  let preco = 0;

  if (produto == "pastel") preco = 5;
  if (produto == "caldo") preco = 7;
  if (produto == "refrigerante") preco = 4;
  if (produto == "suco") preco = 6; // verificação

  let subtotal = preco * qtd; // cálculo

  itens.push({
    produto: produto,
    qtd: qtd,
    subtotal: subtotal //manipulação de dados
  });

  atualizarLista(); // atualização // dependência de outra função
}

function atualizarLista() {
  let lista = document.getElementById("lista");
  lista.innerHTML = "";

  total = 0;

  for (let i = 0; i < itens.length; i++) {
    let item = itens[i];

    let li = document.createElement("li");
    li.innerHTML = item.produto + " | Qtd: " + item.qtd + " | R$ " + item.subtotal; //exibição

    lista.appendChild(li);

    total = total + item.subtotal; // cáculo do total
  }

  document.getElementById("total").innerText = total; //exibição

  salvarTotal(); // salva dados
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
    desconto = total * 0.1; //tratamento de dados
  }

  let taxa = total * 0.05; //calculo de taxa

  let totalFinal = total - desconto + taxa; //calculo de total final com desconto e taxa

  alert("Total final: " + totalFinal); //exibição de dados

  localStorage.setItem("ultimoPedido", totalFinal); //atualização de dados

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