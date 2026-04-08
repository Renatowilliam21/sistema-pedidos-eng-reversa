class Produto {
  constructor(nome, preco){
    this.nome = nome
    this.preco = preco
  }
}

class Produtos {
  static criar(nomeProduto) {
    if (nomeProduto == "pastel") return new Produto("pastel", 5)
    else if (nomeProduto == "caldo") return new Produto("caldo", 7)
    else if (nomeProduto == "refrigerante") return new Produto("refrigerante", 4)
    else if (nomeProduto == "suco") return new Produto("suco", 6)
  }
}

class Carrinho {
  constructor() {
    if(Carrinho.instance) {
      return Carrinho.instance
    }

    this.itens = []
    this.total = 0

    Carrinho.instance = this
  }
  adicionarItem(nomeProduto, qtd) {
    const produto = Produtos.criar(nomeProduto)
    const subtotal = produto.preco * qtd;

    for(let i = 0; i < this.itens.length; i++) {
      if(this.itens[i].produto == produto.nome) {
        this.itens[i].qtd += qtd
        this.itens[i].subtotal += produto.preco * qtd
        this.calcularTotal()
        return
      }
    }

    this.itens.push({
      produto: produto.nome,
      qtd: Number(qtd),
      subtotal: subtotal
    });

    this.calcularTotal(); // Centraliza o cálculo
    }

  limparTudo() {
    this.itens = [];
    this.total = 0;
    atualizarLista()
  }
  
  removerUltimo() {
    this.itens.pop();
    this.calcularTotal();
  }
  
  calcularTotal() {
    this.total = this.itens.reduce((soma, item) => soma + item.subtotal, 0)
    this.salvarTotal()
  }

  salvarTotal() {
    // duplicação de responsabilidade
    localStorage.setItem("total", total);
  }

  calcularTotalFinal() {
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
  const carrinho = new Carrinho()

  function adicionar() {
    let produto = document.getElementById("produto").value;
    let qtd = Number(document.getElementById("qtd").value);

    if (qtd === "" || qtd <= 0) {
      alert("Quantidade inválida");
      return; // Interrompe a função aqui, evitando erros no carrinho
    }

    carrinho.adicionarItem(produto, qtd)
    
    atualizarLista();
  }

  function atualizarLista() {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    // Lê os dados do Singleton em vez de variáveis globais perdidas
    for (let i = 0; i < carrinho.itens.length; i++) {
      let item = carrinho.itens[i];
      let li = document.createElement("li");
      li.innerHTML = `${item.produto} | Qtd: ${item.qtd} | R$ ${item.subtotal}`;
      lista.appendChild(li);
    }

    document.getElementById("total").innerText = carrinho.total;
    document.getElementById("limparTudo").style.display = "flex"
    document.getElementById("lista1").style.display = "block"
  } 
  
  function finalizar() {
    let totalFinal = carrinho.calcularTotalFinal();
  
    alert("Total final: " + totalFinal);
    localStorage.setItem("ultimoPedido", totalFinal);

    carrinho.limparTudo();
    atualizarLista();
  }
  /*
    FUNÇÃO RESPONSAVEL POR LIMPAR TODO O CARRINHO
    PODE PARECER UMA REPETIÇÃO DE OUTRO OBJETO ACIMA PORÉM ESTE SERVE PARA RECEBER O INPUT DO BUTTON DO HTML 
  */
  function limparTudo() { 
    carrinho.limparTudo();
    atualizarLista();
    document.getElementById("limparTudo").style.display = "none"
    document.getElementById("lista1").style.display = "none"
  }

  function removerUltimo() {
    carrinho.removerUltimo();
    atualizarLista();
  }
 

