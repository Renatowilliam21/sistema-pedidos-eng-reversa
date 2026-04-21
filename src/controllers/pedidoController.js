import { ProdutoFactory } from "../factories/produtoFactory.js";
import { ItemPedido } from "../models/itemPedido.js";
import { PedidoService } from "../services/pedidoService.js";
import { PedidoRepository } from "../repositories/pedidoRepository.js";

export class PedidoController {
  constructor(view) {
    this.view = view;
    this.service = new PedidoService();
    this.repository = new PedidoRepository(); // Singleton
    this.itens = [];
  }

  adicionarItem(tipo, qtd) {
    if (qtd <= 0 || !qtd) return this.view.mostrarMensagem("Quantidade inválida");

    const produto = ProdutoFactory.criar(tipo);
    const item = new ItemPedido(produto, qtd);
    
    this.itens.push(item);
    
    const total = this.service.calcularTotal(this.itens);
    this.view.atualizarLista(this.itens, total);
    this.view.limparFormulario();
  }

  finalizar() {
    const total = this.service.calcularTotal(this.itens);
    const desconto = this.service.calcularDesconto(total);
    const taxa = this.service.calcularTaxa(total);
    const totalFinal = total - desconto + taxa;

    this.repository.salvar(totalFinal);
    this.view.mostrarMensagem(`Total final: R$ ${totalFinal.toFixed(2)}`);
    
    this.itens = [];
    this.view.atualizarLista(this.itens, 0);
  }
}