// ================================
// CAMADA DE DADOS
// ================================

class ItemPedido {
  constructor(produto, quantidade, precoUnitario) {
    this.produto = produto;
    this.quantidade = quantidade;
    this.precoUnitario = precoUnitario;
  }

  calcularSubtotal() {
    return this.quantidade * this.precoUnitario;
  }
}

class Pedido {
  constructor() {
    this.itens = [];
  }

  adicionarItem(item) {
    this.itens.push(item);
  }

  obterItens() {
    return [...this.itens];
  }

  calcularSubtotal() {
    return this.itens.reduce((acumulado, item) => acumulado + item.calcularSubtotal(), 0);
  }

  limpar() {
    this.itens = [];
  }
}

class CatalogoProdutosSingleton {
  constructor() {
    if (CatalogoProdutosSingleton.instancia) {
      return CatalogoProdutosSingleton.instancia;
    }

    this.produtos = {
      pastel: 5,
      caldo: 7,
      refrigerante: 4,
      suco: 6
    };

    CatalogoProdutosSingleton.instancia = this;
  }

  obterPreco(produto) {
    return this.produtos[produto] || 0;
  }
}

class PersistenciaPedidosSingleton {
  constructor() {
    if (PersistenciaPedidosSingleton.instancia) {
      return PersistenciaPedidosSingleton.instancia;
    }

    PersistenciaPedidosSingleton.instancia = this;
  }

  salvarUltimoPedido(valor) {
    localStorage.setItem("ultimoPedido", valor.toFixed(2));
  }
}

// ================================
// FACTORY
// ================================

class EntidadeFactory {
  static criarPedido() {
    return new Pedido();
  }

  static criarItem(produto, quantidade, precoUnitario) {
    return new ItemPedido(produto, quantidade, precoUnitario);
  }
}

// ================================
// CAMADA DE NEGÓCIO
// ================================

class PedidoService {
  constructor(catalogoProdutos, persistenciaPedidos) {
    this.catalogoProdutos = catalogoProdutos;
    this.persistenciaPedidos = persistenciaPedidos;
  }

  adicionarItemAoPedido(pedido, produto, quantidade) {
    const preco = this.catalogoProdutos.obterPreco(produto);
    const item = EntidadeFactory.criarItem(produto, quantidade, preco);
    pedido.adicionarItem(item);
  }

  gerarResumo(pedido) {
    const subtotal = pedido.calcularSubtotal();

    let desconto = 0;
    if (subtotal > 100) {
      desconto = subtotal * 0.2;
    } else if (subtotal > 50) {
      desconto = subtotal * 0.1;
    }

    const taxa = subtotal * 0.05;
    const totalFinal = subtotal - desconto + taxa;

    return { subtotal, desconto, taxa, totalFinal };
  }

  finalizarPedido(pedido) {
    const resumo = this.gerarResumo(pedido);
    this.persistenciaPedidos.salvarUltimoPedido(resumo.totalFinal);
    pedido.limpar();
    return resumo;
  }
}

// ================================
// CONTROLLER (Interface <-> Negócio)
// ================================

class PedidoController {
  constructor() {
    this.pedido = EntidadeFactory.criarPedido();
    this.service = new PedidoService(
      new CatalogoProdutosSingleton(),
      new PersistenciaPedidosSingleton()
    );

    this.elementos = {
      produto: document.getElementById("produto"),
      quantidade: document.getElementById("qtd"),
      lista: document.getElementById("lista"),
      subtotal: document.getElementById("subtotal"),
      desconto: document.getElementById("desconto"),
      taxa: document.getElementById("taxa"),
      totalFinal: document.getElementById("total-final"),
      btnAdicionar: document.getElementById("btn-adicionar"),
      btnFinalizar: document.getElementById("btn-finalizar")
    };
  }

  iniciar() {
    this.elementos.btnAdicionar.addEventListener("click", () => this.adicionarItem());
    this.elementos.btnFinalizar.addEventListener("click", () => this.finalizarPedido());
    this.renderizar();
  }

  adicionarItem() {
    const produto = this.elementos.produto.value;
    const quantidade = Number.parseInt(this.elementos.quantidade.value, 10);

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
      alert("Quantidade inválida");
      return;
    }

    this.service.adicionarItemAoPedido(this.pedido, produto, quantidade);
    this.elementos.quantidade.value = "";
    this.renderizar();
  }

  finalizarPedido() {
    const resumo = this.service.gerarResumo(this.pedido);

    if (this.pedido.obterItens().length === 0) {
      alert("Adicione ao menos um item antes de finalizar o pedido.");
      return;
    }

    alert(
      `Subtotal: R$ ${this.formatarMoeda(resumo.subtotal)}\n` +
      `Desconto: R$ ${this.formatarMoeda(resumo.desconto)}\n` +
      `Taxa: R$ ${this.formatarMoeda(resumo.taxa)}\n` +
      `Total Final: R$ ${this.formatarMoeda(resumo.totalFinal)}`
    );

    this.service.finalizarPedido(this.pedido);
    this.renderizar();
  }

  renderizar() {
    this.renderizarItens();
    this.renderizarResumo();
  }

  renderizarItens() {
    this.elementos.lista.innerHTML = "";

    this.pedido.obterItens().forEach((item) => {
      const li = document.createElement("li");
      li.innerText = `${item.produto} | Qtd: ${item.quantidade} | R$ ${this.formatarMoeda(item.calcularSubtotal())}`;
      this.elementos.lista.appendChild(li);
    });
  }

  renderizarResumo() {
    const resumo = this.service.gerarResumo(this.pedido);
    this.elementos.subtotal.innerText = this.formatarMoeda(resumo.subtotal);
    this.elementos.desconto.innerText = this.formatarMoeda(resumo.desconto);
    this.elementos.taxa.innerText = this.formatarMoeda(resumo.taxa);
    this.elementos.totalFinal.innerText = this.formatarMoeda(resumo.totalFinal);
  }

  formatarMoeda(valor) {
    return valor.toFixed(2).replace(".", ",");
  }
}

const controller = new PedidoController();
controller.iniciar();
