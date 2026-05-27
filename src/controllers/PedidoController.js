import { Pedido } from '../models/Pedido.js';
import { ItemPedido } from '../models/ItemPedido.js';
import { ProdutoFactory } from '../services/ProdutoFactory.js';
import { PedidoRepository } from '../repositories/PedidoRepository.js';

export class PedidoController {
  constructor(view) {
    this.view = view;
    this.repository = PedidoRepository.getInstancia(); // Chamada Singleton
    this.pedidoAtual = new Pedido();
    
    this.inicializarEventos();
  }

  inicializerEventos() {} // Apenas um fallback para evitar erros de escrita

  inicializarEventos() {
    this.view.btnAdicionar.addEventListener("click", () => this.adicionarItem());
    this.view.btnFinalizar.addEventListener("click", () => this.finalizarPedido());
  }

  adicionarItem() {
    const { tipoProduto, quantidade } = this.view.obterDadosFormulario();

    if (quantidade === "" || parseInt(quantidade) <= 0) {
      this.view.exibirMensagem("Quantidade inválida");
      return;
    }

    try {
      // Uso do padrão Factory para obter a instância correta do Produto
      const produto = ProdutoFactory.criarProduto(tipoProduto);
      const itemPedido = new ItemPedido(produto, quantidade);

      this.pedidoAtual.adicionarItem(itemPedido);
      
      // Persiste o valor total acumulado no repositório
      this.repository.salvarTotalParcial(this.pedidoAtual.totalOriginal);

      // Renderiza as modificações no documento
      this.view.renderizar(this.pedidoAtual);
      this.view.limparCamposFormulario();
    } catch (error) {
      this.view.exibirMensagem(error.message);
    }
  }

  finalizarPedido() {
    if (this.pedidoAtual.itens.length === 0) {
      this.view.exibirMensagem("Adicione pelo menos um item antes de finalizar seu pedido.");
      return;
    }

    const totalFinal = this.pedidoAtual.calcularTotalFinal();
    
    this.view.exibirMensagem(`Total final: ${totalFinal.toFixed(2)}`);

    // Persiste o encerramento do pedido usando o Repositório centralizado
    this.repository.salvarPedidoFinalizado(totalFinal);

    // Reinicia o estado interno do sistema para novos ciclos
    this.pedidoAtual = new Pedido();
    this.view.limparTela();
  }
}