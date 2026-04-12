//Classes dos itens do pedido

class ItemPedido {
  constructor(nomeProduto, quantidade, preco) {
    this.produto = nomeProduto;
    this.qtd = Number(quantidade);
    this.preco = Number(preco);
    this.subtotal = this.qtd * this.preco;
  }
}

//Classe do pedido
class Pedidos {
  constructor() {
    this.itens = [];
    this.total = 0;
  }

  adicionarItem(novoItem) {

    this.itens.push(novoItem);
    this.total += novoItem.subtotal
  }

  removerUltimo() {
    if (this.itens.length > 0) {
      let itemRemovido = this.itens.pop();
      this.total -= itemRemovido.subtotal;
    }
  }

  precoFinal() {

    let taxa = this.total * 0.05;
    let desconto = this.total;

    if (this.total > 100) {
      desconto -= (this.total * 0.2);
    } else if (this.total > 50) {
      desconto -= (this.total * 0.1);
    }

    return desconto + taxa;

  }

  limpar() {
    this.itens = [];
    this.total = 0;
  }

}

let pedidoAtual = new Pedidos;

//funções gerais


function adicionarPedido(produto, qtd) {
  let qtd = Number(qtd), novoItem, verificarValor;

  if (qtd == "" || qtd <= 0) {
    alert("Quantidade inválida");
    return;
  } else {


    verificarValor = verificarPreco(produto);

    if (verificarValor != 0) {
      novoItem = new ItemPedido(produto, qtd, verificarValor);

      pedidoAtual.adicionarItem(novoItem);

      salvarPedido();
    } else {
      alert("Produto inválido ou não encontrado.");
    }

  }

}

function verificarPreco(produto) {
  let preco = 0;

  let tabelaPrecos = {
    "pastel": 5,
    "caldo": 7,
    "refrigerante": 4,
    "suco": 6
  };

  return tabelaPrecos[produto.toLowerCase()] || preco;
}


function finalizarPedido() {
  if (pedidoAtual.itens.length === 0) {
    alert("Adicione itens ao pedido antes de finalizar.");
    return;
  }

  let totalFinal = pedidoAtual.precoFinal();

  alert("Total final: " + totalFinal);

  atualziarLocalStorage("ultimoPedido", totalFinal);

}

function limparTudo() {
  
  pedidoAtual.limpar();
  limparHTML();
}

function removerUltimo() {
  pedidoAtual.removerUltimo();
  
}


//

function limparHTML() {
  document.getElementById("lista").innerHTML = "";
  document.getElementById("total").innerText = 0;
  
}

//Funções para o HTML

function atualizarTela() {
  let listaHTML = document.getElementById("lista");
  listaHTML.innerHTML = ""; 

  
  for (let i = 0; i < pedidoAtual.itens.length; i++) {
    let item = pedidoAtual.itens[i];
    let li = document.createElement("li");

    li.innerHTML = `${item.produto} | Qtd: ${item.qtd} | R$ ${item.subtotal.toFixed(2)}`;
    listaHTML.appendChild(li);
  }

  
  document.getElementById("total").innerText = pedidoAtual.total.toFixed(2);
}

function clickAdcionarPedido() {

  let pegarElementoProduto = document.getElementById("produto").value;
  let pegarElementoQuantidade = document.getElementById("qtd").value;

  adicionarPedido(pegarElementoProduto, pegarElementoQuantidade);
  atualizarTela();
}

function clickFinalizarPedido() {
  if (pedidoAtual.itens.length === 0) {
    alert("Adicione itens ao pedido antes de finalizar.");
    return;
  }
  finalizarPedido();
  limparTudo();
}

function clickRemoverUltimo() {
  removerUltimo();
  atualizarTela();
}


//atualziar os local.storage

function atualziarLocalStorage(chave, valor) {
  localStorage.setItem(chave, valor);
}

function salvarPedido() {
  localStorage.setItem("total", pedidoAtual.total);
}