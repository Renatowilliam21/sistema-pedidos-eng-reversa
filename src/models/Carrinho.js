class Carrinho {
  constructor() {
    // 1. Padrão Singleton: Garante que só exista um carrinho no sistema
    if(Carrinho.instance) {
      return Carrinho.instance;
    }

    this.itens = [];
    this.total = 0;
    
    // Lista de "Ouvintes" (Padrão Observer)
    this.observers = []; 

    Carrinho.instance = this;
  }

  // ==========================================
  // PADRÃO OBSERVER (Para atualizar a interface)
  // ==========================================
  adicionarObserver(observer) {
    this.observers.push(observer);
  }

  notificarObservers() {
    // Avisa todos os ouvintes (ex: a View) que o carrinho mudou
    this.observers.forEach(observer => observer.atualizarTela(this));
  }

  // ==========================================
  // LÓGICA DO CARRINHO (Sem dependência do DOM)
  // ==========================================
  adicionarItem(nomeProduto, qtd) {
    const produto = Produtos.criar(nomeProduto);
    const subtotal = produto.preco * qtd;

    let itemExistente = this.itens.find(item => item.produto === produto.nome);

    if (itemExistente) {
      itemExistente.qtd += qtd;
      itemExistente.subtotal += subtotal;
    } else {
      this.itens.push({
        produto: produto.nome,
        qtd: Number(qtd),
        subtotal: subtotal
      });
    }

    this.calcularTotal();
    this.notificarObservers(); // Dispara a atualização automática da View aqui!
  }

  removerItemEspecifico(nomeProduto) {
    const index = this.itens.findIndex(item => item.produto === nomeProduto);
    if (index !== -1) {
      this.itens.splice(index, 1);
      this.calcularTotal();
      this.notificarObservers(); // Dispara a atualização automática da View aqui!
    }
  }

  limparTudo() {
    this.itens = [];
    this.total = 0;
    this.notificarObservers(); // Dispara a atualização automática da View aqui!
  }
  
  calcularTotal() {
    this.total = this.itens.reduce((soma, item) => soma + item.subtotal, 0);
  }
}