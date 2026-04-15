import { Produto, Pedido } from '../entities/models.js';

export class ProdutoFactory {
  static #catalogo = {
    pastel:       { nome: "Pastel",        preco: 5 },
    caldo:        { nome: "Caldo de Cana", preco: 7 },
    refrigerante: { nome: "Refrigerante", preco: 4 },
    suco:          { nome: "Suco",          preco: 6 },
  };

  static criar(tipo) {
    const dados = this.#catalogo[tipo];
    if (!dados) throw new Error(`Produto desconhecido: "${tipo}"`);
    return new Produto(dados.nome, dados.preco);
  }
}

export class PedidoManager {
  static #instancia = null;
  constructor() { this.pedidoAtual = new Pedido(); }

  static getInstance() {
    if (!PedidoManager.#instancia) PedidoManager.#instancia = new PedidoManager();
    return PedidoManager.#instancia;
  }

  getPedido() { return this.pedidoAtual; }
  novoPedido() { 
    this.pedidoAtual = new Pedido(); 
    localStorage.removeItem("pedidoAtual");
  }
  salvar() {
    const total = this.pedidoAtual.calcularTotal();
    localStorage.setItem("pedidoAtual", total.toFixed(2));
  }
}