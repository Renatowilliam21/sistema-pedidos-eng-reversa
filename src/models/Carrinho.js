class Carrinho {
  constructor() {
    // 1. Padrão Singleton: Garante que só exista um carrinho no sistema
    if(Carrinho.instance) {
      return Carrinho.instance
    }

    this.itens = []
    this.total = 0
    this.observers = [] 
    
    this.estrategiaDesconto = new SemDesconto()
    
    Carrinho.instance = this
  }
  
  adicionarObserver(observer) {
    this.observers.push(observer)
  }
  
  notificarObservers() {
    // Avisa todos os ouvintes (ex: a View) que o carrinho mudou
    this.observers.forEach(observer => observer.atualizarTela(this))
  }

  calcularTotal() {
    const subtotalBruto = this.itens.reduce((soma, item) => soma + item.subtotal, 0)
    
    this.total = this.estrategiaDesconto.calcular(subtotalBruto)
    
    console.log("Novo total calculado:", this.total)
  }

  aplicarDesconto(estrategia) {
    this.estrategiaDesconto = estrategia
    this.calcularTotal()
    this.notificarObservers()
  }

  // LÓGICA DO CARRINHO
  adicionarItem(nomeProduto, qtd) {
    const produto = Produtos.criar(nomeProduto)
    const subtotal = produto.preco * qtd

    let itemExistente = this.itens.find(item => item.produto === produto.nome)

    if (itemExistente) {
      itemExistente.qtd += qtd
      itemExistente.subtotal += subtotal
    } else {
      this.itens.push({
        produto: produto.nome,
        qtd: Number(qtd),
        subtotal: subtotal
      })
    }

    this.calcularTotal()
    this.notificarObservers()
  }

  removerItemEspecifico(nomeProduto) {
    const index = this.itens.findIndex(item => item.produto === nomeProduto)
    if (index !== -1) {
      this.itens.splice(index, 1)
      this.calcularTotal()
      this.notificarObservers()
    }
  }

  limparTudo() {
    this.itens = []
    this.total = 0
    this.notificarObservers()
  }
  
}