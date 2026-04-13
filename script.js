//Classes dos itens do pedido

class ItemPedido {
  constructor(nomeProduto, quantidade, preco) {
    this.produto = nomeProduto;
    this.qtd = Number(quantidade);
    this.preco = Number(preco);
    this.subtotal = this.qtd * this.preco;
  }

  static criarItem(produto, quantidadeDigitada) {
    let qtd = Number(quantidadeDigitada);

    if (!qtd || qtd <= 0) {
      throw new Error("Quantidade inválida. Digite um número maior que zero.");
    }

    const tabelaPrecos = {
      "pastel": 5, "caldo": 7, "refrigerante": 4, "suco": 6
    };

    let precoVigente = tabelaPrecos[produto.toLowerCase()] || 0;

    if (precoVigente === 0) {
      throw new Error("Produto inválido ou não cadastrado.");
    }

    return new ItemPedido(produto, qtd, precoVigente);
  }
}



//Classe do pedido
class Pedidos {
  constructor() {

    if (Pedidos.instancia) {
      return Pedidos.instancia;
    }
    this.itens = [];
    this.total = 0;

    Pedidos.instancia = this;
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
  try {
    let novoItem = ItemPedido.criarItem(produto, qtd);

    pedidoAtual.adicionarItem(novoItem);
    salvarPedido();
  } catch (erro) {
    alert(erro.message);
  }

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
  if (pedidoAtual.itens.length === 0) {
    alert("Adicione itens ao pedido antes de remover.");
    return;
  }
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