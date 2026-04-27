const carrinho = new Carrinho()
carrinho.adicionarObserver(CarrinhoView)

function adicionar(nome_produto, opcao) {
  let input = opcao.parentElement.querySelector('input')
  let qtd = Number(input.value)
  
  if(qtd <= 0 || qtd == "") {
    alert("Escolha uma quantidade válida")
    return
  }

  carrinho.adicionarItem(nome_produto, qtd)

  input.value = ""
}

function validarCupom() {
  const input = document.getElementById("text")
  const msg = document.getElementById("mensagem")
  const codigo = document.getElementById("text").value.toUpperCase().trim()

  console.log("Tentando cupom:", codigo)

  const cuponsValidos = {
    "CUPOM10": new DescontoPercentual(10),
    "CUPOM5": new DescontoPercentual(5),
  }

  if(cuponsValidos[codigo]) {
    carrinho.aplicarDesconto(cuponsValidos[codigo])
    msg.style.display = "flex"
    msg.innerText = "Cupom aplicado!"
    msg.style.color = "green"
  } else {
    carrinho.aplicarDesconto(new SemDesconto())
    msg.style.display = "flex"
    msg.innerText = "Cupom inválido"
    msg.style.color = "red"
  }
}

function remover(produto) {
  carrinho.removerItemEspecifico(produto)
}

function limparTudo() {
  carrinho.limparTudo()
}