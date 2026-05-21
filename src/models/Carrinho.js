class Carrinho {
  constructor() {
    if(Carrinho.instance) {
      return Carrinho.instance
    }

    this.itens = []
    this.total = 0
    this.observers = [] 
    
    this.estrategiaDesconto = new SemDesconto()
    
    Carrinho.instance = this
  }
  
  // PADRÃO DE PROJETO OBSERVER
  adicionarObserver(observer) {
    this.observers.push(observer)
  }
  
  notificarObservers() {
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
    const tabelaPrecos = {
      'pastel': 5.00,
      'caldo': 8.00,
      'refrigerante': 5.00,
      'suco': 6.00
    };

    const precoUnitario = tabelaPrecos[nomeProduto] || 0;

    const itemExistente = this.itens.find(item => item.produto === nomeProduto);

    if (itemExistente) {
      itemExistente.atualizarQtd(itemExistente.qtd + Number(qtd));
    } else {
      const novoItem = new ItemPedido(nomeProduto, qtd, precoUnitario);
      this.itens.push(novoItem);
    }

    this.calcularTotal();
    this.notificarObservers();
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