const precos = {
    pastel: 5,
    caldo: 7,
    refrigerante: 4,
    suco: 6,
  };

let itens = [];
let total = 0;

function adicionar() {
  let produto = document.getElementById("produto").value;
  let qtd = Number(document.getElementById("qtd").value);

  if (qtd == "" || qtd <= 0) {
    alert("Quantidade inválida");
    return;
  }


  const preco = precos[produto];

  const item = {
    produto,
    qtd,
    subtotal: preco * qtd,
  };
  

itens.push(item);

  atualizarLista();
}

function atualizarLista() {
 total = calcularTotal();
 renderizarLista();
 salvarTotal();
}
  
function calcularTotal() {
  return itens.reduce((soma, item) => soma + item.subtotal, 0);
}


function renderizarLista() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  itens.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = `${item.qtd}x ${item.produto} - R$${item.subtotal}`;
    lista.appendChild(li);
  });

  document.getElementById("total").innerText = total;
}

function salvarTotal() {
  localStorage.setItem("total", total);
}

function finalizar() {
  const desconto = calcularDesconto(total);
  const taxa = total * 0.05;

  const totalFinal = total - desconto + taxa;

  alert(`Total final: R$ ${totalFinal}`);

  localStorage.setItem("Ultimopedido", totalFinal);

  limparTudo();
}




function calcularDesconto(valor) {
  if (valor > 100) return valor * 0.2;
  if (valor > 50) return valor * 0.1;
  return 0;
}

function removerUltimo() {
  if (itens.length === 0) return;

  itens.pop();
  atualizarLista();
}

function limparTudo() {
  itens = [];
  total = 0;

  renderizarLista();
}