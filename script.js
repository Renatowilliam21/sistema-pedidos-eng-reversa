class Produto {
  constructor(nome, preco){
    this.nome = nome
    this.preco = preco
  }
}

class Produtos {
  static criar(nomeProduto) {
    const precos = {
      "pastel": 5,
      "caldo": 7,
      "refrigerante": 4,
      "suco": 6
    };
    if (precos[nomeProduto]) {
      return new Produto(nomeProduto, precos[nomeProduto]);
    }
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
    const subtotal = produto.preco * qtd

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
    })

    this.calcularTotal() 
  }

  limparTudo() {
    this.itens = []
    this.total = 0
    atualizarLista()
  }
  
  removerItemEspecifico(nomeProduto) {
    const index = this.itens.findIndex(item => item.produto === nomeProduto)

    if (index !== -1) {
      this.itens.splice(index, 1) 
      this.calcularTotal() 
    }
  }
  
  calcularTotal() {
    this.total = this.itens.reduce((soma, item) => soma + item.subtotal, 0)
    this.salvarTotal()
  }

  salvarTotal() {
    // duplicação de responsabilidade
    localStorage.setItem("total", this.total)
  }

  calcularTotalFinal() {
    let desconto = 0
    if (this.total > 100) {
      desconto = this.total * 0.2
    } else if (this.total > 50) {
      desconto = this.total * 0.1
    }

    let taxa = this.total * 0.05
    return this.total - desconto + taxa
  }
}
  const carrinho = new Carrinho()

  // PARTE INTEGRADA A INTERAÇÃO COM O USUÁRIO

  function adicionar() {
    let produto = document.getElementById("produto").value
    let qtd = Number(document.getElementById("qtd").value)

    if (qtd === "" || qtd <= 0) {
      alert("Quantidade inválida")
      return
    }

    carrinho.adicionarItem(produto, qtd)   
    
    atualizarLista()
  }

  function atualizarLista() {
    let lista = document.getElementById("lista")
    lista.innerHTML = ""

    for (let i = 0; i < carrinho.itens.length; i++) {
      let item = carrinho.itens[i]
      let li = document.createElement("li")
      li.innerHTML = `${item.produto} | Qtd: ${item.qtd} | R$ ${item.subtotal} <button onclick="remover('${item.produto}')" class = "remover">remover</button>`
      lista.appendChild(li)
    }

    document.getElementById("total").innerText = carrinho.total
    document.getElementById("remover").style.display = "flex"
    document.getElementById("lista1").style.display = "block"
  } 
  
  function finalizar() {
    let totalFinal = carrinho.calcularTotalFinal()
  
    alert("Total final: " + totalFinal)
    localStorage.setItem("ultimoPedido", totalFinal)

    carrinho.limparTudo()
    atualizarLista()
    document.getElementById("remover").style.display = "none"
    document.getElementById("lista1").style.display = "none"
  }

  function limparTudo() { 
    carrinho.limparTudo()
    atualizarLista()
    document.getElementById("remover").style.display = "none"
    document.getElementById("lista1").style.display = "none"    
  }

  function remover(produto) {
    carrinho.removerItemEspecifico(produto)
  
    atualizarLista() 
  
    if (carrinho.itens.length === 0) {
      document.getElementById("remover").style.display = "none"
      document.getElementById("lista1").style.display = "none"
    }
  }


