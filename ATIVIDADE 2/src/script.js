class PedidoFactory {
  static criarPedido(nome, qtd) {
    let preco = 0;
    
    if (nome === "pastel") preco = 5;
    if (nome === "caldo") preco = 7;
    if (nome === "refrigerante") preco = 4;
    if (nome === "suco") preco = 6;

    let quantidade = parseInt(qtd);

    return {
      nome: nome,
      qtd: quantidade,
      preco: preco,
      subtotal: preco * quantidade
    };
  }
}

class Carrinho {
  constructor() {
    if (Carrinho.instancia) {
      return Carrinho.instancia;
    }
    
    this.itens = [];
    this.total = 0;
    Carrinho.instancia = this;
  }

  adicionarItem(pedido) {
    this.itens.push(pedido);
    this.calcularTotal();
  }

  removerUltimoItem() {
    this.itens.pop();
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = this.itens.reduce((soma, item) => soma + item.subtotal, 0);
  }

  limpar() {
    this.itens = [];
    this.total = 0;
  }

  calcularFechamento() {
    let desconto = 0;
    if (this.total > 100) {
      desconto = this.total * 0.2;
    } else if (this.total > 50) {
      desconto = this.total * 0.1;
    }

    let taxa = this.total * 0.05;
    return this.total - desconto + taxa;
  }
}

const meuCarrinho = new Carrinho();

function adicionar() {
  let nomePedido = document.getElementById("produto").value;
  let qtdInput = document.getElementById("qtd").value;

  if (qtdInput === "" || qtdInput <= 0) {
    alert("Quantidade inválida");
    return;
  }

  let novoPedido = PedidoFactory.criarPedido(nomePedido, qtdInput);
  meuCarrinho.adicionarItem(novoPedido);
  atualizarLista();
}

function atualizarLista() {
  let lista = document.getElementById("lista");
  lista.innerHTML = "";

  for (let i = 0; i < meuCarrinho.itens.length; i++) {
    let item = meuCarrinho.itens[i];
    let li = document.createElement("li");
    li.innerHTML = item.nome + " | Qtd: " + item.qtd + " | R$ " + item.subtotal;
    lista.appendChild(li);
  }

  document.getElementById("total").innerText = meuCarrinho.total;
  localStorage.setItem("total", meuCarrinho.total);
}

function removerUltimo() {
  meuCarrinho.removerUltimoItem();
  atualizarLista();
}

function finalizar() {
  let totalFinal = meuCarrinho.calcularFechamento();
  
  alert("Total final: " + totalFinal);
  localStorage.setItem("ultimoPedido", totalFinal);

  meuCarrinho.limpar();
  atualizarLista();
}

function limparTudo() {
  meuCarrinho.limpar();
  atualizarLista();
}